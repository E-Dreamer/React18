/*
 * @Author: E-Dreamer
 * @Date: 2022-08-05 10:24:22
 * @LastEditTime: 2022-08-16 09:20:12
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { BasicForm, useForm } from '@/components/Form';
import { FormSchema } from '@/components/Form/src/types/form';
import { Button } from 'antd';


const Ceshi = () => {
  const FormItem: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      required: true,
      rules: [{ required: true, message: '请填写' }],
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'fieldTime',
      component: 'RangePicker',
      label: '时间字段',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        onChange: (e: any) => {
          console.log(e);
          updateSchema({
            field: 'field2',
            componentProps: {
              disabled: true
            }
          })
        },
      },
    },
  ]
  let attr = {
    name: 'ceshi',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    initialValues: {
      field1: 100,
      field2: '第二个输入框'
    }
  }
  const [register, { setFieldsValue, getFieldsValue,
    setProps, removeSchemaByFiled, updateSchema }] = useForm({
      schemas: FormItem,
      formAttr: attr,
      rowProps: {
        gutter: 10
      },
      fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      formActionProps: {
      }
    })
  const setField1 = () => {
    setFieldsValue({
      field1: 1000
    })
  }
  const setAttr = () => {
    setProps({
      formAttr: {
        layout: 'horizontal', labelCol: { span: 6 },
        wrapperCol: { span: 10 },
      }
    })
    updateSchema({
      field: 'field1',
      componentProps: {
        disabled: true
      }
    })
  }
  const form1Sub = () => {
    const form = getFieldsValue(true)
    console.log('form: ', form);
  }
  const submit = (value: any) => {
    console.log(value)
  }
  return <div>
    <Button onClick={setAttr}>修改formAttr</Button>
    <Button type='primary' onClick={setField1}>修改值</Button>
    <Button onClick={form1Sub}>提交获取值</Button>
    <Button onClick={() => removeSchemaByFiled('field5')}>removeSchema</Button>
    <BasicForm register={register} submit={submit} />
  </div>
}
export default Ceshi