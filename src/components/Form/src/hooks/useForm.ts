/*
 * @Author: E-Dreamer
 * @Date: 2022-08-09 15:07:25
 * @LastEditTime: 2022-08-18 16:53:56
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { FormActionType, UseFormReturnType, RegisterFn, FormProps, FormSchema } from './../types/form'
import { Form } from 'antd'
import React, { useState } from 'react'
import { useFormValues } from './useFormValues'
import { deepClone, deepMerge } from '@/utils'
import { isArray, isObject, isString } from '@/utils/is'

// 默认值
let defaultProps: FormProps = {
  formAttr: {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    layout: 'inline',
  },
  schemas: [],
  rowProps: {
    gutter: 20,
  },
  transformDateFunc: (date) => {
    return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date
  },
}

const useForm = (obj: FormProps): UseFormReturnType => {
  const props = Object.assign(defaultProps, obj)

  const [form] = Form.useForm()

  const formRef = React.createRef()

  const { handleFormValues } = useFormValues({ props })

  const { schemas, ...argProps } = props;

  const [formProps, setFormProps] = useState(argProps)

  const [schemaState, setSchemaState] = useState(schemas)

  const schemaList: FormSchema[] = deepClone(schemaState)

  const register: RegisterFn = () => {
    return {
      form,
      formRef,
      ...formProps,
      schemas: schemaState,
      methods
    }
  }

  const methods: FormActionType = {
    // * form表单自带方法
    scrollToField: (name, options) => {
      return form.scrollToField(name, options)
    },
    // getFieldsValue(true) 时返回所有值
    getFieldsValue: (nameList, filterFunc) => {
      return handleFormValues(form.getFieldsValue(nameList, filterFunc))
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
    // 修改传递的属性
    setProps: (obj) => {
      let data: object = deepClone(formProps)
      const result = deepMerge(data, obj)
      setFormProps(result)
    },
    // 移除某个field
    removeSchemaByFiled: (fields) => {
      if (!fields) {
        return;
      }
      let fieldList: string[] = isString(fields) ? [fields] : fields;
      if (isString(fields)) {
        fieldList = [fields];
      }
      for (const field of fieldList) {
        if (isString(field)) {
          const index = schemaList.findIndex((schema) => schema.field === field);
          if (index !== -1) {
            schemaList.splice(index, 1);
            setSchemaState(schemaList)
          }
        }
      }
    },
    // 添加field
    appendSchemaByField: (schema, prefixField, first = false) => {
      const index = schemaList.findIndex((schema) => schema.field === prefixField);
      if (!prefixField || index === -1 || first) {
        first ? schemaList.unshift(schema) : schemaList.push(schema);
        setSchemaState(schemaList)
        return;
      }
      if (index !== -1) {
        schemaList.splice(index + 1, 0, schema);
      }
      setSchemaState(schemaList)
    },
    // 重置schemas
    resetSchema: (data) => {
      let updateData: FormSchema[] = [];
      if (isObject(data)) {
        updateData.push(data as FormSchema)
      }
      if (isArray(data)) {
        updateData = [...data]
      }
      const hasField = updateData.every(
        (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field),
      );

      if (!hasField) {
        throw new Error('All children of the form schemas array that need to be updated must contain the `field` field');
      }
      setSchemaState(updateData as FormSchema[])
    },
    // 更新schemas
    updateSchema: (data) => {
      let updateData: Partial<FormSchema>[] = [];
      if (isObject(data)) {
        updateData.push(data as FormSchema);
      }
      if (isArray(data)) {
        updateData = [...data];
      }
      const hasField = updateData.every(
        (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field),
      );
      if (!hasField) {
        throw new Error('All children of the form schemas array that need to be updated must contain the `field` field');
      }
      const schema: FormSchema[] = [];
      updateData.forEach(item => {
        schemaList.forEach(val => {
          if (item.field === val.field) {
            const newSchema = deepMerge(val, item);
            schema.push(newSchema as FormSchema);
          } else {
            schema.push(val);
          }
        })
      })
      setSchemaState(schema)
    }
  }

  return [register, methods]
}

export default useForm
