/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:06:29
 * @LastEditTime: 2022-08-05 15:26:10
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { updateCollapse } from "@/store/menu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const CollapseIcon = (props: any) => {
	const isCollapse = useSelector((state:any)=> state.menu.isCollapse);
  const dispatch = useDispatch()
	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};


export default CollapseIcon
