import { FormSchema } from './../../Form/src/types/form';
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-19 09:59:42
 * @LastEditTime: 2022-08-19 13:57:40
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { FormProps } from 'antd/lib/form/Form'

export interface FormAttr extends FormProps {

}


export interface useFormProps {
  FormAttr: FormAttr;
  schemas: FormSchema[]
}

export interface FormActionType {
  setProps: (params: useFormProps) => void;
}