// import { FormInstance } from 'antd/es/form/Form';
import { ReactNode } from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { NamePath, ScrollOptions } from 'antd/lib/form/interface';
import { ColEx, ComponentType } from './index';
import { RuleObject } from "antd/lib/form";
import { FormItem } from './formItem';
import { RowProps } from 'antd';

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
export type RegisterFn = () => void
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
  size?: SizeType
}
export interface FormProps {
  // Form configuration rules
  schemas: FormSchema[];
  FormAttr?: Partial<FormAttr>;
  rowProps?: RowProps;
  //转换时间
  transformDateFunc?: Function;
}
// form 配置
export interface FormSchema {
  // Field name
  field: string;
  // Event name triggered by internal value change, default change
  changeEvent?: string;
  // Variable name bound to v-model Default value
  valueField?: string;
  // Label name
  label: ReactNode;
  // Auxiliary text
  subLabel?: string;
  // Help text on the right side of the text
  helpMessage?:
  | string
  | string[]
  | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
  disabledLabelWidth?: boolean;
  // render component
  component: ComponentType;
  // Component parameters
  componentProps?:
  | ((opt: {
    schema: FormSchema;
    tableAction: object;
    formActionType: object;
    formModel: Recordable;
  }) => Recordable)
  | object;
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  suffix?: string | number | ((values: RenderCallbackParams) => string | number);

  // Validation rules
  rules?: Rule[];
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;

  // Reference formModelItem
  itemProps?: Partial<FormItem>;

  // col configuration outside formModelItem
  colProps?: Partial<ColEx>;

  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // Matching details components
  span?: number;

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  // Render the content in the form-item tag
  render?: (renderCallbackParams: RenderCallbackParams) => JSX.Element | string;

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => JSX.Element | string;

  renderComponentContent?:
  | ((renderCallbackParams: RenderCallbackParams) => any)
  | JSX.Element
  | string;

  // Custom slot, in from-item
  slot?: string;

  // Custom slot, similar to renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
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
  getFieldsValue: (nameList?: NamePath[] | true, filterFunc?: (meta: { touched: boolean, validating: boolean }) => boolean) => any
  setFieldsValue: (values: any) => void
  submit: () => void
  validateFields: (nameList?: NamePath[]) => Promise<void>
  resetFields: (fields?: NamePath[]) => void,
  setProps: (obj: FormAttr) => void;
}