/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:31
 * @LastEditTime: 2022-08-04 16:14:38
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { setLanguage } from "@/store/global";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";

const Language = (props: any) => {
	const { language, setLanguage } = props;

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span>简体中文</span>,
					onClick: () => setLanguage("zh"),
					disabled: language === "zh"
				},
				{
					key: "2",
					label: <span>English</span>,
					onClick: () => setLanguage("en"),
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

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(Language);
