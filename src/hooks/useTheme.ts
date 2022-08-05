/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 17:10:46
 * @LastEditTime: 2022-08-04 17:11:01
 * @LastEditors: E-Dreamer
 * @Description: 
 */
/**
 * @description 全局主题设置
 * */
const useTheme = (weakOrGray:string)=>{
  const initTheme = () => {
		const body = document.documentElement as HTMLElement;
		if (!weakOrGray) body.setAttribute("style", "");
		if (weakOrGray === "weak") body.setAttribute("style", "filter: invert(80%)");
		if (weakOrGray === "gray") body.setAttribute("style", "filter: grayscale(1)");
	};
	initTheme();

	return {
		initTheme
	};
}

export default useTheme;