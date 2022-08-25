/*
 * @Author: E-Dreamer
 * @Date: 2022-08-19 09:44:00
 * @LastEditTime: 2022-08-25 09:19:20
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { deepMerge } from "@/utils"
import { Form } from "antd"
import { useEffect, useState } from "react"

const BasicForm = (props: any) => {
  const [form] = Form.useForm()
  const [propState, setPropsState] = useState({})
  const setProps = (formProps: any) => {
    setPropsState(deepMerge(propState || {}, formProps))
  }

  const registerProps = {
    setProps,
    form,
  }
  useEffect(() => {
    register(registerProps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const { register } = props;
  // register 通过回调函数setProps 将useForm获取到的参数 传递到basicform组件中
  register(registerProps)
  return (
    <Form form={form}></Form>
  )
}

export default BasicForm