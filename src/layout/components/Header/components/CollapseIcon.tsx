/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:06:29
 * @LastEditTime: 2022-08-04 16:06:30
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { updateCollapse } from "@/store/menu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const CollapseIcon = (props: any) => {
	const { isCollapse, updateCollapse } = props;
	return (
		<div
			className="collapsed"
			onClick={() => {
				updateCollapse(!isCollapse);
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
