/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:37
 * @LastEditTime: 2022-08-05 15:29:13
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Drawer, Divider, Switch, message } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { FireOutlined } from "@ant-design/icons";
import { setWeakOrGray } from "@/store/global";

const Theme = (props: any) => {
	const [visible, setVisible] = useState<boolean>(false);
	const { setWeakOrGray } = props;
	const { weakOrGray } = props.themeConfig;

	const onChange = (checked: boolean, theme: string) => {
		if (checked) return setWeakOrGray(theme);
		setWeakOrGray("");
	};

	return (
		<>
			<i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					setVisible(true);
				}}
			></i>
			<Drawer
				title="布局设置"
				closable={false}
				onClose={() => {
					setVisible(false);
				}}
				visible={visible}
				width={320}
			>
				<Divider className="divider">
					<FireOutlined />
					全局主题
				</Divider>
				<div className="theme-item">
					<span>暗黑模式（未完成）</span>
					<Switch
						checkedChildren={<>🌞</>}
						unCheckedChildren={<>🌜</>}
						onChange={() => {
							message.success("欢迎提交 pull request ✨");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						checked={weakOrGray === "gray"}
						onChange={e => {
							onChange(e, "gray");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						checked={weakOrGray === "weak"}
						onChange={e => {
							onChange(e, "weak");
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setWeakOrGray };
//两种方式获取 store state 该种方式props中可以获取
export default connect(mapStateToProps, mapDispatchToProps)(Theme);
