// import { FormInstance } from 'antd/es/form/Form';
import { ReactNode, Ref } from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { NamePath, ScrollOptions } from 'antd/lib/form/interface';
import { ColEx, ComponentType } from './index';
import { FormInstance, FormListFieldData, RuleObject } from "antd/lib/form";
import { ButtonProps, RowProps, TooltipProps } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
export type RegisterFn = () => FormProps & { methods: FormActionType, form: FormInstance<any>, formRef: Ref<any> }
export type UseFormReturnType = [RegisterFn, FormActionType];

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}
export type FormAttr = {
  layout?: 'vertical' | 'inline' | 'horizontal';
  //只有在属性 layout 为 horizontal 时有效
  colon?: boolean,
  disabled?: boolean,
  component?: ComponentType | false;
  initialValues?: object;
  labelAlign?: 'left' | 'right';
  labelWrap?: boolean;
  labelCol?: Partial<ColEx>;
  wrapperCol?: Partial<ColEx>;
  name?: string;
  preserve?: boolean;
  requiredMark?: boolean | 'optional';
  scrollToFirstError?: boolean | object
  size?: SizeType;
  validateTrigger?: string | string[];
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void;
  onFinish?: (value: any) => void;
  onFinishFailed?: ({ values, errorFields, outOfDate }: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
}

export type FormActionProps = {
  //show 操作按鈕組
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  submitButtonOptions?: Partial<ButtonProps>;
  actionColOptions?: Partial<ColEx>;
  actionSpan?: number;
  isAdvanced?: boolean;
  hideAdvanceBtn?: boolean
}
export interface FormBaseProps {
  // 表单attr
  formAttr?: Partial<FormAttr>;
  // row attr
  rowProps?: RowProps;
  //可以将 时间数组 转换成 两个参数
  fieldMapToTime?: [string, [string, string], string?][]
  //所有时间转换
  transformDateFunc?: (data: any) => string;
  // formAction 的props
  formActionProps?: Partial<FormActionProps>;
  // 是否开启自动获取焦点
  autoFocusFirstItem?: boolean
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
}
export interface FormProps extends FormBaseProps {
  // 传递的表单数组
  schemas: FormSchema[];
}

export interface FormSchemaOption {
  // Component parameters
  componentProps?:
  | ((opt: {
    schema: FormSchema;
    tableAction: object;
    formActionType: object;
    formModel: Recordable;
  }) => Recordable)
  | object;
  // Validation rules
  rules?: Rule[];
  required?: boolean;
  // 官网form.item 属性 
  itemProps?: Partial<{
    colon?: boolean;
    dependencies?: NamePath[];
    extra?: ReactNode;
    getValueFromEvent?: (args: any[]) => any;
    getValueProps?: (value: any) => any;
    hasFeedback?: boolean;
    help?: ReactNode;
    hidden?: boolean;
    htmlFor?: string;
    messageVariables?: Record<string, string>;
    validateStatus?: ValidateStatus,
    tooltip?: ReactNode | TooltipProps & { icon: ReactNode }
  }>;
  // col configuration outside formModelItem
  colProps?: Partial<ColEx>;
}
// form 配置
export interface FormSchema extends FormSchemaOption {
  // Field name
  field: string;
  // Label name
  label: ReactNode;
  // render component
  component: ComponentType;
}

export interface updataFormSchema extends FormSchemaOption {
  // Field name
  field?: string;
  // Label name
  label?: ReactNode;
  // render component
  component?: ComponentType;
}

export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}

export interface FormActionType {
  scrollToField: (name: NamePath, options: ScrollOptions) => void;
  getFieldsValue: (nameList: NamePath[] | true, filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any
  setFieldsValue: (values: any) => void
  submit: () => void
  validateFields: (nameList?: NamePath[]) => Promise<void>
  resetFields: (fields?: NamePath[]) => void,
  setProps: (obj: FormBaseProps) => void;
  removeSchemaByFiled: (field: string | string[]) => void;
  appendSchemaByField: (schema: FormSchema, prefixField?: string, first?: boolean) => void;
  resetSchema: (data: FormSchema | FormSchema[]) => void;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => void;
}