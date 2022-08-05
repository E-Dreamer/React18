/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:31
 * @LastEditTime: 2022-08-05 15:26:03
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { setLanguage } from "@/store/global";
import { Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

const Language = (props: any) => {
	const language = useSelector((state:any)=> state.global.language);
  const dispatch = useDispatch()
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span>简体中文</span>,
					onClick: () =>dispatch(setLanguage("zh")),
					disabled: language === "zh"
				},
				{
					key: "2",
					label: <span>English</span>,
					onClick: () =>dispatch(setLanguage("en")) ,
					disabled: language === "en"
				}
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={["click"]} arrow={true}>
			<i className="icon-style iconfont icon-zhongyingwen"></i>
		</Dropdown>
	);
};

export default Language
