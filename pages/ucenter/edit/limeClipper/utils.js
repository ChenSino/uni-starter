
/**
 * h5网络地址转base64
 */
export function pathToBase64(path) {
	// #ifdef H5
	return new Promise((resolve, reject) => {
		const _fileReader = (blob) => {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				resolve(e.target.result);
			};
			fileReader.readAsDataURL(blob);
			fileReader.onerror = (error) => {
				console.error('blobToBase64 error:', JSON.stringify(error))
				reject(new Error('blobToBase64 error'));
			};
		}
		if (/^(http|\/\/)/.test(path) && typeof FileReader === 'function') {
			window.URL = window.URL || window.webkitURL;
			const xhr = new XMLHttpRequest();
			xhr.open("get", path, true);
			xhr.timeout = 2000;
			xhr.responseType = "blob";
			xhr.onload = function() {
				if (this.status == 200) {
					_fileReader(this.response)
				}
			}
			xhr.send();
		}
	})
	// #endif
}

/**
 * 判断手指触摸位置
 */
export function determineDirection(cutX, cutY, clipWidth, clipHeight, currentX, currentY) {
	const EXPAND_SIZE = 24;

	let leftx1 = cutX - EXPAND_SIZE;
	let leftx2 = cutX + EXPAND_SIZE;

	let topy1 = cutY - EXPAND_SIZE;
	let topy2 = cutY + EXPAND_SIZE;

	let rightx1 = cutX + clipWidth - EXPAND_SIZE;
	let rightx2 = cutX + clipWidth + EXPAND_SIZE;

	let bottomy1 = cutY + clipHeight - EXPAND_SIZE;
	let bottomy2 = cutY + clipHeight + EXPAND_SIZE;
	let corner;
	const isRight = currentX > rightx1 && currentX < rightx2;
	const isLeft = currentX > leftx1 && currentX < leftx2;
	const isBottom = currentY > bottomy1 && currentY < bottomy2;
	const isTop = currentY > topy1 && currentY < topy2;
	if (isRight && isBottom) {
		corner = 1;
	} else if (isRight && isTop) {
		corner = 2;
	} else if (isLeft && isTop) {
		corner = 3;
	} else if (isLeft && isBottom) {
		corner = 4;
	}
	return corner;
}

/**
 * 图片边缘检测检测时，计算图片偏移量
 */
export function calcImageOffset(data, scale) {
	let {
		imageLeft: left,
		imageTop: top,
		imageWidth,
		imageHeight,
		cutX,
		clipWidth,
		cutY,
		clipHeight
	} = data
	scale = scale || data.scale;
	if ((data.angle / 90) % 2) {
		imageWidth = mageHeight;
		imageHeight = mageWidth;
	}

	// 当前图片宽度/高度
	const currentImageSize = (size) => (size * scale) / 2;
	const currentImageWidth = currentImageSize(imageWidth);
	const currentImageHeight = currentImageSize(imageHeight);

	left = cutX + currentImageWidth >= left ? left : cutX + currentImageWidth;
	left = cutX + clipWidth - currentImageWidth <= left ? left : cutX + clipWidth - currentImageWidth;
	top = cutY + currentImageHeight >= top ? top : cutY + currentImageHeight;
	top = cutY + clipHeight - currentImageHeight <= top ? top : cutY + clipHeight - currentImageHeight;
	return {
		left,
		top,
		scale
	};
}

/**
 * 图片边缘检测时，计算图片缩放比例
 */
export function calcImageScale(data, scale) {
	scale = scale || data.scale;
	let {
		imageWidth,
		imageHeight,
		clipWidth,
		clipHeight,
		angle
	} = data
	if ((angle / 90) % 2) {
		imageWidth = imageHeight;
		imageHeight = imageWidth;
	}
	if (imageWidth * scale < clipWidth) {
		scale = clipWidth / imageWidth;
	}
	if (imageHeight * scale < clipHeight) {
		scale = Math.max(scale, clipHeight / imageHeight);
	}
	return scale;
}

/**
 * 计算图片尺寸
 */
export function calcImageSize(width, height, data) {
	let imageWidth = width,
		imageHeight = height;
	let {
		clipWidth,
		clipHeight,
		sysinfo,
		width: oWidth,
		height: oHeight
	} = data
	if (imageWidth && imageHeight) {
		if (imageWidth / imageHeight > (clipWidth || oWidth) / (clipWidth || oHeight)) {
			imageHeight = clipHeight || oHeight;
			imageWidth = (width / height) * imageHeight;
		} else {
			imageWidth = clipWidth || oWidth;
			imageHeight = (height / width) * imageWidth;
		}
	} else {
		let sys = sysinfo || uni.getSystemInfoSync();
		imageWidth = sys.windowWidth;
		imageHeight = 0;
	}
	return {
		imageWidth,
		imageHeight
	};
}

/**
 * 勾股定理求斜边
 */
export function calcPythagoreanTheorem(width, height) {
	return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}

/**
 * 拖动裁剪框时计算
 */
export function clipTouchMoveOfCalculate(data, event) {
	const clientX = event.touches[0].clientX;
	const clientY = event.touches[0].clientY;

	const {
		clipWidth,
		clipHeight,
		cutY: oldCutY,
		cutX: oldCutX,
		cutstart,
		isLockRatio
	} = data;
	let {
		maxWidth,
		minWidth,
		maxHeight,
		minHeight
	} = data;
	maxWidth = maxWidth / 2;
	minWidth = minWidth / 2;
	minHeight = minHeight / 2;
	maxHeight = maxHeight / 2;

	let width = clipWidth,
		height = clipHeight,
		cutY = oldCutY,
		cutX = oldCutX,
		sizecorrect = () => {
			width = width <= maxWidth ? (width >= minWidth ? width : minWidth) : maxWidth;
			height = height <= maxHeight ? (height >= minHeight ? height : minHeight) : maxHeight;
		},
		sizeinspect = () => {
			sizecorrect();
			if ((width > maxWidth || width < minWidth || height > maxHeight || height < minHeight) && isLockRatio) {
				return false;
			} else {
				return true;
			}
		};
	if (cutstart.corner) {
		height = cutstart.height + (cutstart.corner > 1 && cutstart.corner < 4 ? 1 : -1) * (cutstart.y - clientY);
	}
	switch (cutstart.corner) {
		case 1:
			width = cutstart.width - cutstart.x + clientX;
			if (isLockRatio) {
				height = width / (clipWidth / clipHeight);
			}
			if (!sizeinspect()) return;
			break;
		case 2:
			width = cutstart.width - cutstart.x + clientX;
			if (isLockRatio) {
				height = width / (clipWidth / clipHeight);
			}
			if (!sizeinspect()) {
				return;
			} else {
				cutY = cutstart.cutY - (height - cutstart.height);
			}

			break;
		case 3:
			width = cutstart.width + cutstart.x - clientX;
			if (isLockRatio) {
				height = width / (clipWidth / clipHeight);
			}
			if (!sizeinspect()) {
				return;
			} else {
				cutY = cutstart.cutY - (height - cutstart.height);
				cutX = cutstart.cutX - (width - cutstart.width);
			}

			break;
		case 4:
			width = cutstart.width + cutstart.x - clientX;
			if (isLockRatio) {
				height = width / (clipWidth / clipHeight);
			}
			if (!sizeinspect()) {
				return;
			} else {
				cutX = cutstart.cutX - (width - cutstart.width);
			}
			break;
		default:
			break;
	}
	return {
		width,
		height,
		cutX,
		cutY
	};
}

/**
 * 单指拖动图片计算偏移
 */
export function imageTouchMoveOfCalcOffset(data, clientXForLeft, clientYForLeft) {
	let left = clientXForLeft - data.touchRelative[0].x,
		top = clientYForLeft - data.touchRelative[0].y;
	return {
		left,
		top
	};
}
