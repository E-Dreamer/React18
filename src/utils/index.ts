/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 15:09:04
 * @LastEditTime: 2022-08-03 15:11:08
 * @LastEditors: E-Dreamer
 * @Description: 
 */
/**
 * @description: 判断值是否未某个类型
 */
 export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}
/**
 * @description:  是否为函数
 */
 export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}