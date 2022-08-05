/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 14:22:44
 * @LastEditTime: 2022-08-05 08:45:06
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config";
import './index.scss'

const NotAuth = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate(HOME_URL);
	};
	return (
		<Result
			status="403"
			title="403"
			subTitle="Sorry, you are not authorized to access this page."
			extra={
				<Button type="primary" onClick={goHome}>
					Back Home
				</Button>
			}
		/>
	);
};

export default NotAuth;
