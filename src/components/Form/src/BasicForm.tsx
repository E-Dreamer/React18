/*
 * @Author: E-Dreamer
 * @Date: 2022-08-09 09:59:35
 * @LastEditTime: 2022-08-10 15:48:21
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { Col, Form, Row } from 'antd'
import React, { ComponentClass, FunctionComponent } from 'react'
import './index.scss'
import { componentMap } from './componentMap'
import PropTypes from 'prop-types'

const BasicForm = (props: any) => {
  const { children, register } = props

  const { form, FormAttr, schemas, rowProps } = register()
  return (
    <Form {...FormAttr} className="basic-form" form={form}>
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
      </Row>
    </Form>
  )
}

BasicForm.propTypes = {
  schemas: PropTypes.array,
  FormAttr: PropTypes.object,
  register: PropTypes.func,
  rowProps: PropTypes.object,
}

BasicForm.defaultProps = {
  schemas: [],
  FormAttr: {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    layout: 'inline',
  },
  rowProps: {
    gutter: 20,
  },
}
export default BasicForm
