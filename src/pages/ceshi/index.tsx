/*
 * @Author: E-Dreamer
 * @Date: 2022-08-05 10:24:22
 * @LastEditTime: 2022-08-10 15:04:16
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
      },
    },
  ]

  const [register, { setFieldsValue, submit, getFieldsValue, setProps }] = useForm({
    schemas: FormItem,
    FormAttr: {
      name: 'ceshi',
      // layout: 'inline',
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      initialValues: {
        field1: 100,
        field2: '第二个输入框'
      }
    },
    rowProps: {
      gutter: 10
    }
  })
  const setField1 = () => {
    setFieldsValue({
      field1: 1000
    })
  }
  const setAttr = () => {
    setProps({ layout: 'horizontal',labelCol: { span: 6 },
    wrapperCol: { span: 10 }, })
    FormItem[1].componentProps = {
      disabled: true
    };
  }
  const form1Sub = () => {
    const form = getFieldsValue(true)
    console.log(form)
    submit()


  }


  const FormItem2: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '这是字段一样的输入框',
      colProps: {
        span: 8,
      },
    },
  ]

  const [register2] = useForm({
    schemas: FormItem2
  })

  return <div>
    <Button onClick={setAttr}>修改formAttr</Button>
    <Button type='primary' onClick={setField1}>修改值</Button>
    <Button onClick={form1Sub}>提交获取值</Button>
    <BasicForm register={register2} />
    <BasicForm register={register} />
  </div>
}
export default Ceshi