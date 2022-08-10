/*
 * @Author: E-Dreamer
 * @Date: 2022-08-09 10:23:57
 * @LastEditTime: 2022-08-09 17:11:45
 * @LastEditors: E-Dreamer
 * @Description: 
 */

import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
  Slider,
  Rate,
  Divider,
} from "antd";
import { Component, ComponentClass, FunctionComponent } from "react";
import { ComponentType } from './types/index';
type components = Component | ComponentClass| FunctionComponent
const componentMap = new Map<ComponentType,components >();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
// componentMap.set('ApiSelect', ApiSelect);
// componentMap.set('ApiTree', ApiTree);
componentMap.set('TreeSelect', TreeSelect);
// componentMap.set('ApiTreeSelect', ApiTreeSelect);
// componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('Switch', Switch);
// componentMap.set('RadioButtonGroup', RadioButtonGroup);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
// componentMap.set('ApiCascader', ApiCascader);
componentMap.set('Cascader', Cascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
// componentMap.set('StrengthMeter', StrengthMeter);
// componentMap.set('InputCountDown', CountdownInput);

// componentMap.set('Upload', BasicUpload);
componentMap.set('Divider', Divider);

export function add(compName: ComponentType, component: components) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}
export { componentMap }