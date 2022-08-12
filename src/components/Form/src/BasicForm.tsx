/*
 * @Author: E-Dreamer
 * @Date: 2022-08-09 09:59:35
 * @LastEditTime: 2022-08-12 16:40:11
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { Col, Form, Row } from 'antd'
import React, { ComponentClass, FunctionComponent } from 'react'
import './index.scss'
import { componentMap } from './componentMap'
import PropTypes from 'prop-types'
import FormAction from './components/FormAction'
import { useAutoFoucs } from './hooks/useAutoFocus'
import { isFunction } from '@/utils/is'

const BasicForm = (props: any) => {
  const { children, register, submit } = props

  const { methods, ...argProps } = register()

  const {
    schemas,
    autoFocusFirstItem,
    formRef,
    form,
    formAttr,
    rowProps,
    formActionProps,
  } = argProps

  const handlerSubmit = async () => {
    const { submitFunc } = argProps
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      return;
    }
    if (!form) return;
    try {
      await methods.validateFields();
      const res = methods.getFieldsValue(true)
      // 
      submit(res)
    } catch (err: any) {
      throw new Error(err);
    }
  }

  const handleReset = () => {
    methods.resetFields()
  }

  useAutoFoucs({ schemas, autoFocusFirstItem, formRef })

  return (
    <Form {...formAttr} className="basic-form" form={form} ref={formRef}>
      <Row {...rowProps}>
        {/* 默认插槽 */}
        {children}
        {schemas.map((i: any, index: number) => {
          const component = componentMap.get(i.component)
          return (
            <Col key={index} {...i.colProps}>
              <Form.Item
                name={i.field}
                label={i.label}
                key={index}
                rules={i.rules}
                required={i.required}
                {...i.itemProps}
              >
                {React.createElement(
                  component as ComponentClass | FunctionComponent,
                  i.componentProps
                )}
              </Form.Item>
            </Col>
          )
        })}
        <FormAction {...formActionProps} submitAction={handlerSubmit} resetAction={handleReset} />
      </Row>
    </Form>
  )
}

BasicForm.propTypes = {
  register: PropTypes.func,
  submit: PropTypes.func,
}
BasicForm.defaultProps = {
  register: () => ({}),
  submit: () => ({}),
}
export default BasicForm
