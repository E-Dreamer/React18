/*
 * @Author: E-Dreamer
 * @Date: 2022-08-19 09:44:00
 * @LastEditTime: 2022-08-19 09:54:46
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { deepMerge } from "@/utils"
import { Form } from "antd"
import { useState } from "react"

const BasicForm = (props: any) => {
  const [form] = Form.useForm()
  const [propState, setPropsState] = useState({})
  const setProps = (formProps: any) => {
    setPropsState(deepMerge(propState || {}, formProps))
  }

  const { register } = props;
  // register 通过回调函数setProps 将useForm获取到的参数 传递到basicform组件中
  register({
    setProps,
    form,
  })

}

export default BasicForm