/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 15:34:04
 * @LastEditTime: 2022-09-01 09:39:27
 * @LastEditors: E-Dreamer
 * @Description: 
 */

import ReactDOM from "react-dom/client";
import Loading from './index'

let needLoadingRequestCount = 0 ;
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let dom = document.createElement("div");
		dom.setAttribute("id", "loading");
		document.body.appendChild(dom);
		ReactDOM.createRoot(dom).render(<Loading />);
	}
	needLoadingRequestCount++;
};
// * 隐藏loading
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		document.body.removeChild(document.getElementById("loading") as HTMLElement);
	}
};
