import CONFIG from '../baseapp.config.js';

const CONFIG_OPEN = CONFIG?.h5?.openApp?.openUrl ? CONFIG.h5.openApp : {};
// 仅H5端添加"打开APP"
export default function() {
	// #ifdef H5
	if (!CONFIG_OPEN.openUrl) return console.warn('请配置app地址');

	let openLogo = CONFIG_OPEN.logo ?
		`<img src="${CONFIG_OPEN.logo}" style="width: 2rem;height: 2rem;border-radius: 3px;">` : '';
	let openApp = document.createElement("div");
	openApp.id = 'openApp';
	openApp.style =
		'width: 100%;height: 45px;display: flex;flex-direction: row;justify-content: space-between;align-items: center;box-sizing: border-box;padding: 0 0.5rem;background-color: #FFFFFF;'
	openApp.innerHTML = `
		<div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
			${openLogo}
			<div style="padding-left: 0.3rem;font-size: 0.25rem;">${CONFIG_OPEN.appname || ''}</div>
		</div>
		<div class="openBtn" style="padding: 5px;font-size: 0.3rem;border-radius: 2px;border: 1px solid #007AFF;color: #007AFF;">下载app</div>
	`;
	document.body.insertBefore(openApp, document.body.firstChild);
	document.body.style = 'height:calc(100% - 45px); margin-top:45px;';
	openApp.addEventListener('click', e => {
		var target = e.target || e.srcElement;
		console.log(target);
		if (target.className.indexOf('openBtn') >= 0) {
			window.location.href = CONFIG_OPEN.openUrl;
		}
	})
	//#endif
}
