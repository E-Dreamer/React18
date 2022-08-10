/*
 * @Author: E-Dreamer
 * @Date: 2022-08-09 15:07:25
 * @LastEditTime: 2022-08-10 16:05:50
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { FormActionType, UseFormReturnType, RegisterFn } from './../types/form';
import { Form } from "antd";
import { FormProps } from './../types/form';
import { useEffect, useState } from 'react';

const useForm = (props: FormProps): UseFormReturnType => {
  const [form] = Form.useForm()

  const { FormAttr, schemas, rowProps } = props;

  const [attr, setAttr] = useState(FormAttr)

  const register: RegisterFn = (() => {
    return { form, schemas, FormAttr: attr, rowProps }
  })

  useEffect(() => {
    console.log(attr, '最新的attr')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr])


  const methods: FormActionType = {
    // * form表单自带方法
    scrollToField: (name, options) => {
      return form.scrollToField(name, options)
    },
    // getFieldsValue(true) 时返回所有值
    getFieldsValue: (nameList, filterFunc) => {
      return nameList && form.getFieldsValue(nameList, filterFunc)
    },
    setFieldsValue: (value) => {
      return form.setFieldsValue(value)
    },
    submit: () => {
      return form.submit()
    },
    validateFields: (nameList) => {
      return form.validateFields(nameList)
    },
    resetFields: (field) => {
      return form.resetFields(field)
    },
    //* 自定义方法
    setProps: (obj) => {
      setAttr((prevState: any) => {
        return { ...prevState, ...obj }
      })
    }
  }
  return [register, methods]
}


export default useForm;