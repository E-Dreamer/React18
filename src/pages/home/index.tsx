/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 11:36:17
 * @LastEditTime: 2022-08-04 11:36:17
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import welcome from "@/assets/images/welcome.png";
import "./index.scss";

const Home = () => {
	return (
		<div className="home">
			<img src={welcome} alt="welcome" />
		</div>
	);
};

export default Home;
