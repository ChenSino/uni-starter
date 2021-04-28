<template>
	<view class="l-clipper" disable-scroll :style="'z-index: ' + zIndex">
		<view 
			class="l-clipper-mask" 
			@touchstart.stop.prevent="clipTouchStart" 
			@touchmove.stop.prevent="clipTouchMove" 
			@touchend.stop.prevent="clipTouchEnd">
			<view class="l-clipper__content" :style="clipStyle">
				<view class="l-clipper__edge" v-for="(item, index) in [0,0,0,0]" :key="index"></view>
			</view>
		</view>
		<image
			class="l-clipper-image"
			@error="imageLoad"
			@load="imageLoad"
			@touchstart="imageTouchStart"
			@touchmove="imageTouchMove"
			@touchend="imageTouchEnd"
			:src="image"
			mode="widthFix"
			v-if="image"
			:style="imageStyle"/>
		<canvas
			canvas-id="l-clipper"
			id="l-clipper"
			disable-scroll
			:style="'width: ' + (canvasWidth * scaleRatio) + 'px; height:' + (canvasHeight * scaleRatio) + 'px;'"
			class="l-clipper-canvas"
		></canvas>
		<view class="l-clipper-tools">
			<view class="l-clipper-tools__btns">
				<view v-if="isShowCancelBtn"  @click="cancel">
					<slot name="cancel" v-if="$slots.cancel" />
					<view v-else class="cancel" >取消</view>
				</view>
				<view v-if="isShowPhotoBtn" @click="uploadImage">
					<slot name="photo" v-if="$slots.photo" />
					<image v-else :src="require('./images/photo.svg')"  />
				</view>
				<view v-if="isShowRotateBtn" @click="rotate">
					<slot name="rotate" v-if="$slots.rotate" />
					<image v-else :src="require('./images/rotate.svg')"  data-type="inverse" />
				</view>
				<view v-if="isShowConfirmBtn" @click="confirm">
					<slot name="confirm" v-if="$slots.confirm" />
					<view v-else class="confirm" >确定</view>
				</view>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { pathToBase64, determineDirection, calcImageOffset, calcImageScale, calcImageSize, calcPythagoreanTheorem, clipTouchMoveOfCalculate, imageTouchMoveOfCalcOffset } from './utils';
export default {
	// version: '0.1.0',
	name: 'l-clipper',
	props: {
		zIndex: {
			type: Number,
			default: 99
		},
		imageUrl: {
			type: String
		},
		quality: {
			type: Number,
			default: 1
		},
		width: {
			type: Number,
			default: 400
		},
		height: {
			type: Number,
			default: 400
		},
		minWidth: {
			type: Number,
			default: 200
		},
		maxWidth: {
			type: Number,
			default: 600
		},
		minHeight: {
			type: Number,
			default: 200
		},
		maxHeight: {
			type: Number,
			default: 600
		},
		isLockWidth: {
			type: Boolean,
			default: false
		},
		isLockHeight: {
			type: Boolean,
			default: false
		},
		isLockRatio: {
			type: Boolean,
			default: true
		},
		scaleRatio: {
			type: Number,
			default: 1
		},
		minRatio: {
			type: Number,
			default: 0.5
		},
		maxRatio: {
			type: Number,
			default: 2
		},
		isDisableScale: {
			type: Boolean,
			default: false
		},
		isDisableRotate: {
			type: Boolean,
			default: false
		},
		isLimitMove: {
			type: Boolean,
			default: false
		},
		isShowPhotoBtn: {
			type: Boolean,
			default: true
		},
		isShowRotateBtn: {
			type: Boolean,
			default: true
		},
		isShowConfirmBtn: {
			type: Boolean,
			default: true
		},
		isShowCancelBtn: {
			type: Boolean,
			default: true
		},
		rotateAngle: {
			type: Number,
			default: 90
		}
	},
	data() {
		return {
			canvasWidth: 0,
			canvasHeight: 0,
			cutX: 0, 
			cutY: 0, 
			aWidth: this.width,
			aHeight: this.height,
			clipWidth: 0,
			clipHeight: 0,
			cutAnimation: false,
			imageWidth: 0, 
			imageHeight: 0,
			imageTop: 0,
			imageLeft: 0,
			scale: 1,
			angle: 0,
			image: this.imageUrl,
			sysinfo: {},
			moveThrottleTimer: null,
			moveThrottleFlag: true,
			timeCutcenter: null,
			flagCutTouch: false,
			flagEndTouch: false,
			cutstart: {},
			cutAnimationTime: null,
			touchRelative: [{x: 0,y: 0}],
			hypotenuseLength: 0,
			ctx: null
		};
	},
	computed: {
		clipStyle() {
			const {clipWidth, clipHeight, cutY, cutX, cutAnimation} = this
			return  `
			width: ${clipWidth}px; 
			height:${clipHeight}px; 
			transition-property: ${cutAnimation ? '' : 'background'};
			left: ${cutX}px;
			top: ${cutY}px
			`
		},
		imageStyle() {
			const {imageWidth, imageHeight, imageLeft, imageTop, cutAnimation, scale, angle} = this
			return `
				width:${imageWidth ? imageWidth + 'px' : 'auto'}; height: ${imageHeight ? imageHeight + 'px' : 'auto'}; 
				transform: translate3d(${imageLeft - imageWidth / 2}px, ${imageTop - imageHeight / 2}px, 0) scale(${scale}) rotate(${angle}deg); 
				transition-duration: ${cutAnimation ? 0.35 : 0}s
			`
		},
		clipSize() {
			const { clipWidth, clipHeight } = this;
			return { clipWidth, clipHeight };
		},
		cutPoint() {
			const { cutY, cutX } = this;
			return { cutY, cutX };
		}
	},
	watch: {
		// #ifdef H5
		imageUrl: {
			handler: async function(url) {
				const res = await pathToBase64(url)
				if(res) {
					this.image = res
				}
			},
			immediate: true,
		},
		// #endif
		image:{
			handler: function (url) {
				 this.getImageInfo(url)
			},
			immediate: true,
		},
		clipSize({ widthVal, heightVal }) {
			let { minWidth, minHeight } = this;
			minWidth = minWidth / 2;
			minHeight = minHeight / 2;
			if (widthVal < minWidth) {
				this.clipWidth = minWidth;
			}
			if (heightVal < minHeight) {
				this.clipHeight = minHeight;
			}
			this.computeCutSize();
		},
		angle(val) {
			this.cutAnimation = true;
			this.moveStop();
			const { isLimitMove } = this;
			if (isLimitMove && val % 90) {
				this.angle = Math.round(val / 90) * 90;
			}
			this.imgMarginDetectionScale();
		},
		cutAnimation(val) {
			clearTimeout(this.cutAnimationTime);
			if (val) {
				let cutAnimationTime = setTimeout(() => {
					this.cutAnimation = false;
				}, 260);
				this.cutAnimationTime = cutAnimationTime;
			}
		},
		isLimitMove(val) {
			if (val) {
				if (this.angle % 90) {
					this.angle = Math.round(this.angle / 90) * 90;
				}
				this.imgMarginDetectionScale();
			}
		},
		cutPoint() {
			this.cutDetectionPosition();
		},
		aWidth(width, oWidth) {
			if (width !== oWidth) {
				this.clipWidth =  width / 2
			}
		},
		aHeight(height, oHeight) {
			if (height !== oHeight) {
				this.clipHeight = height / 2
			}
		}
	},
	mounted() {
		const sysinfo = uni.getSystemInfoSync();
		this.sysinfo = sysinfo;
		this.setCutInfo();
		this.setCutCenter();
		this.computeCutSize();
		this.cutDetectionPosition();
	},
	methods: {
		getImageInfo(url) {
			if (!url) return;
			uni.showLoading({
				title: '请稍候...',
				mask: true
			});
			
			uni.getImageInfo({
				src: url,
				success: res => {
					this.imgComputeSize(res.width, res.height);
					if (this.isLimitMove) {
						this.imgMarginDetectionScale();
						this.$emit('ready', res);
					}
				},
				fail: () => {
					this.imgComputeSize();
					if (this.isLimitMove) {
						this.imgMarginDetectionScale();
					}
				}
			});
		},
		setCutInfo() {
			const { aWidth, aHeight, sysinfo } = this;
			const clipWidth = aWidth / 2;
			const clipHeight = aHeight / 2;
			const cutY = (sysinfo.windowHeight - clipHeight) / 2;
			const cutX = (sysinfo.windowWidth - clipWidth) / 2;
			const imageLeft = sysinfo.windowWidth / 2;
			const imageTop = sysinfo.windowHeight / 2;
			this.ctx = uni.createCanvasContext('l-clipper', this);
			this.clipWidth = clipWidth;
			this.clipHeight = clipHeight;
			this.cutX = cutX;
			this.cutY = cutY;
			this.canvasHeight = clipHeight;
			this.canvasWidth = clipWidth;
			this.imageLeft = imageLeft;
			this.imageTop = imageTop;
		},
		setCutCenter() {
			const { sysInfo, clipHeight, clipWidth, imageTop, imageLeft } = this;
			let sys = sysInfo || uni.getSystemInfoSync();
			let cutY = (sys.windowHeight - clipHeight) * 0.5;
			let cutX = (sys.windowWidth - clipWidth) * 0.5;
			this.imageTop = imageTop - this.cutY + cutY;
			this.imageLeft = imageLeft - this.cutX + cutX;
			this.cutY = cutY;
			this.cutX = cutX;
		},
		computeCutSize() {
			const { clipHeight, clipWidth, sysinfo, cutX, cutY } = this;
			if (clipWidth > sysinfo.windowWidth) {
				this.clipWidth = sysinfo.windowWidth;
			} else if (clipWidth + cutX > sysinfo.windowWidth) {
				this.cutX = sysinfo.windowWidth - cutX;
			}
			if (clipHeight > sysinfo.windowHeight) {
				this.clipHeight = sysinfo.windowHeight;
			} else if (clipHeight + cutY > sysinfo.windowHeight) {
				this.cutY = sysinfo.windowHeight - cutY;
			}
		},
		cutDetectionPosition() {
			const { cutX, cutY, sysinfo, clipHeight, clipWidth } = this;
			let cutDetectionPositionTop = () => {
					if (cutY < 0) {
						this.cutY = 0;
					}
					if (cutY > sysinfo.windowHeight - clipHeight) {
						this.cutY = sysinfo.windowHeight - clipHeight;
					}
				},
				cutDetectionPositionLeft = () => {
					if (cutX < 0) {
						this.cutX = 0;
					}
					if (cutX > sysinfo.windowWidth - clipWidth) {
						this.cutX = sysinfo.windowWidth - clipWidth;
					}
				};
			if (cutY === null && cutX === null) {
				let newCutY = (sysinfo.windowHeight - clipHeight) * 0.5;
				let newCutX = (sysinfo.windowWidth - clipWidth) * 0.5;
				this.cutX = newCutX; 
				this.cutY = newCutY; 
			} else if (cutY !== null && cutX !== null) {
				cutDetectionPositionTop();
				cutDetectionPositionLeft();
			} else if (cutY !== null && cutX === null) {
				cutDetectionPositionTop();
				this.cutX = (sysinfo.windowWidth - clipWidth) / 2;
			} else if (cutY === null && cutX !== null) {
				cutDetectionPositionLeft();
				this.cutY = (sysinfo.windowHeight - clipHeight) / 2;
			}
		},
		imgComputeSize(width, height) {
			const { imageWidth, imageHeight } = calcImageSize(width, height, this);
			this.imageWidth = imageWidth;
			this.imageHeight = imageHeight;
		},
		imgMarginDetectionScale(scale) {
			if (!this.isLimitMove) return;
			const currentScale = calcImageScale(this, scale);
			this.imgMarginDetectionPosition(currentScale);
		},
		imgMarginDetectionPosition(scale) {
			if (!this.isLimitMove) return;
			const { scale: currentScale, left, top } = calcImageOffset(this, scale);
			this.imageLeft = left;
			this.imageTop = top;
			this.scale = currentScale;
		},
		moveThrottle() {
			if( this.moveThrottleFlag !== true) {
				this.moveThrottleFlag = true
			}
		},
		moveDuring() {
			clearTimeout(this.timeCutcenter);
		},
		moveStop() {
			clearTimeout(this.timeCutcenter);
			const timeCutcenter = setTimeout(() => {
				if (!this.cutAnimation) {
					this.cutAnimation = true;
				}
				this.setCutCenter();
			}, 800);
			this.timeCutcenter = timeCutcenter;
		},
		clipTouchStart(event) {
			// #ifdef H5
			event.preventDefault()
			// #endif
			if (!this.image) {
				uni.showToast({
					title: '请选择图片',
					icon: 'none'
				});
				return;
			}
			const currentX = event.touches[0].clientX;
			const currentY = event.touches[0].clientY;
			const { cutX, cutY, clipWidth, clipHeight } = this;
			const corner = determineDirection(cutX, cutY, clipWidth, clipHeight, currentX, currentY);
			this.moveDuring();
			if(!corner) {
				return
			}
			this.cutstart = {
				width: clipWidth,
				height: clipHeight,
				x: currentX,
				y: currentY,
				cutY,
				cutX,
				corner
			};
			this.flagCutTouch = true;
			this.flagEndTouch = true;
		},
		clipTouchMove(event) {
			// #ifdef H5
			event.stopPropagation()
			event.preventDefault()
			// #endif
			if (!this.image) {
				uni.showToast({
					title: '请选择图片',
					icon: 'none'
				});
				return;
			}
			const { flagCutTouch, moveThrottleFlag } = this;
			if (flagCutTouch && moveThrottleFlag) {
				const { isLockRatio, isLockHeight, isLockWidth } = this;
				if (isLockRatio && (isLockWidth || isLockHeight)) return;
				this.moveThrottleFlag = false;
				if(this.moveThrottleFlag !== false) {
					this.moveThrottleFlag = false;
				}
				this.moveThrottle();
				const { width, height, cutX, cutY } = clipTouchMoveOfCalculate(this, event);
				if (!isLockWidth && !isLockHeight) {
					this.clipWidth = width;
					this.clipHeight = height;
					this.cutX = cutX;
					this.cutY = cutY;
				} else if (!isLockWidth) {
					this.clipWidth = width// clipWidth;
					this.cutX = cutX;
				} else if (!isLockHeight) {
					this.clipHeight = height//clipHeight;
					this.cutY = cutY;
				}
				this.imgMarginDetectionScale();
			}
		},
		clipTouchEnd() {
			this.moveStop();
			this.flagCutTouch = false;
		},
		imageTouchStart(e) {
			// #ifdef H5
			event.preventDefault()
			// #endif
			this.flagEndTouch = false;
			this.cutAnimation = false;
			const { imageLeft, imageTop } = this;
			const clientXForLeft = Math.round(e.touches[0].clientX);
			const clientYForLeft =  Math.round(e.touches[0].clientY);

			let touchRelative = [];
			if (e.touches.length === 1) {
				touchRelative[0] = {
					x: clientXForLeft - imageLeft,
					y: clientYForLeft - imageTop
				};
				this.touchRelative = touchRelative;
			} else {
				const clientXForRight = Math.round(e.touches[1].clientX);
				const clientYForRight = Math.round(e.touches[1].clientY);
				let width = Math.abs(clientXForLeft - clientXForRight);
				let height = Math.abs(clientYForLeft - clientYForRight);
				const hypotenuseLength = calcPythagoreanTheorem(width, height);

				touchRelative = [
					{
						x: clientXForLeft - imageLeft,
						y: clientYForLeft - imageTop
					},
					{
						x: clientXForRight - imageLeft,
						y: clientYForRight - imageTop
					}
				];
				this.touchRelative = touchRelative;
				this.hypotenuseLength = hypotenuseLength;
			}
		},
		imageTouchMove(e) {
			// #ifdef H5
			event.preventDefault()
			// #endif
			const { flagEndTouch, moveThrottleFlag } = this;
			if (flagEndTouch || !moveThrottleFlag) return;
			const clientXForLeft = Math.round(e.touches[0].clientX);
			const clientYForLeft = Math.round(e.touches[0].clientY);
			this.moveThrottleFlag = false;
			this.moveThrottle();
			this.moveDuring();
			if (e.touches.length === 1) {
				const { left, top } = imageTouchMoveOfCalcOffset(this, clientXForLeft, clientYForLeft);
				this.imageLeft = left;
				this.imageTop = top;
				this.imgMarginDetectionPosition();
			} else {
				const clientXForRight = Math.round(e.touches[1].clientX);
				const clientYForRight = Math.round(e.touches[1].clientY);
				let width = Math.abs(clientXForLeft - clientXForRight),
					height = Math.abs(clientYForLeft - clientYForRight),
					hypotenuse = calcPythagoreanTheorem(width, height), 
					scale = this.scale * (hypotenuse / this.hypotenuseLength);
				if (this.isDisableScale) {
					scale = 1;
				} else {
					scale = scale <= this.minRatio ? this.minRatio : scale;
					scale = scale >= this.maxRatio ? this.maxRatio : scale;
					this.$emit('change', {
						width: this.imageWidth * scale,
						height: this.imageHeight * scale
					});
				}

				this.imgMarginDetectionScale(scale);
				this.hypotenuseLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
				this.scale = scale;
			}
		},
		imageTouchEnd() {
			this.flagEndTouch = true;
			this.moveStop();
		},
		uploadImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					const tempFilePaths = res.tempFilePaths;
					this.image = tempFilePaths[0];
				}
			});
		},
		imageReset() {
			const sys = this.sysinfo || uni.getSystemInfoSync();
			this.scale = 1;
			this.angle = 0;
			this.imageTop = sys.windowHeight / 2;
			this.imageLeft = sys.windowWidth / 2;
		},
		imageLoad(e) {
			this.imageReset();
			uni.hideLoading();
			this.$emit('ready', e.detail);
		},
		rotate(event) {
			if (this.isDisableRotate) return;
			if (!this.image) {
				uni.showToast({
					title: '请选择图片',
					icon: 'none'
				});
				return;
			}
			const { rotateAngle } = this;
			const originAngle = this.angle
			const type = event.currentTarget.dataset.type;
			if (type === 'along') {
				this.angle = originAngle + rotateAngle
			} else {
				this.angle = originAngle - rotateAngle
			}
			this.$emit('rotate', this.angle);
		},
		confirm() {
			if (!this.image) {
				uni.showToast({
					title: '请选择图片',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '加载中'
			});

			const { clipHeight, clipWidth, ctx, scale, imageLeft, imageTop, cutX, cutY, angle, scaleRatio, image, quality, type: imageType } = this;
			let { canvasHeight, canvasWidth } = this;
			const draw = () => {
				const imageWidth = this.imageWidth * scale * scaleRatio;
				const imageHeight = this.imageHeight * scale * scaleRatio;
				const xpos = imageLeft - cutX;
				const ypos = imageTop - cutY;
				ctx.translate(xpos * scaleRatio, ypos * scaleRatio);
				ctx.rotate((angle * Math.PI) / 180);
				ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
				ctx.draw(false, () => {
					const width = clipWidth * scaleRatio
					const height = clipHeight * scaleRatio
					let params = {
						x: 0,
						y: 0,
						width,
						height,
						destWidth: width,
						destHeight: height,
						canvasId: 'l-clipper',
						fileType: 'png',
						quality,
						success: (res) => {
							data.url = res.tempFilePath;
							uni.hideLoading();
							this.$emit('success', data);
						},
						fail: (error) => {
							console.error('error', error)
							this.$emit('fail', error);
						}
					};

					let data = {
						url: '',
						width,
						height
					};
					uni.canvasToTempFilePath(params, this)
				});
			};

			if (canvasWidth !== clipWidth || canvasHeight !== clipHeight) {
				canvasWidth = clipWidth;
				canvasHeight = clipHeight;
				ctx.draw();
				setTimeout(() => {
					draw();
				}, 100);
			} else {
				draw();
			}
		},
		cancel() {
			this.$emit('cancel', false)
		},
	}
};
</script>

<style scoped>
@import './index.css'
</style>
