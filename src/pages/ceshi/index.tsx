/*
 * @Author: E-Dreamer
 * @Date: 2022-08-05 10:24:22
 * @LastEditTime: 2022-08-08 11:25:41
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { DatePicker, DatePickerProps } from 'antd';
const Ceshi = ()=>{
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return <div>
    <DatePicker onChange={onChange} />
  </div>
}
export default Ceshi