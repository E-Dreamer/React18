/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:09
 * @LastEditTime: 2022-08-04 16:13:04
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config";
import { connect } from "react-redux";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
			{breadcrumbList.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

const mapStateToProps = (state: any) => state.breadcrumb;
export default connect(mapStateToProps)(BreadcrumbNav);
