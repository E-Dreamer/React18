/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:09
 * @LastEditTime: 2022-08-05 10:59:16
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item>
       <Link to={HOME_URL}>首页</Link>
      </Breadcrumb.Item>
			{breadcrumbList.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

const mapStateToProps = (state: any) => state.breadcrumb;
export default connect(mapStateToProps)(BreadcrumbNav);
