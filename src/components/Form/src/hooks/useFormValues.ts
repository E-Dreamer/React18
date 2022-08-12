import { isArray, isFunction, isString } from '@/utils/is';
import { dateUtil } from '@/utils/dateUtils';
import { isObject } from '@/utils/is';
import { FormProps } from './../types/form';
type useFormValuesProps = {
  props: FormProps
}
// deconstruct array-link key. This method will mutate the target.
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        // set(target, k.trim(), value[index]);
        target[k.trim()] = value[index]
      });
      return true;
    }
  }
}
/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = isObject(value) ? value : {};
      keys.forEach((k) => {
        // set(target, k.trim(), value[k.trim()]);
        const key = k.trim()
        target[key] = value[key]
      });
      return true;
    }
  }
}

export function useFormValues({ props }: useFormValuesProps) {
  function handleFormValues(value: Recordable) {
    if (!isObject(value)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(value)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = props.transformDateFunc;
      // 日期的值 默认是moment对象
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map((item) => transformDateFunc?.(item));
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }
      if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
        // 没有解构成功的，按原样赋值
        res[key] = value;
      }
    }

    return handleRangeTimeValue(res)
  }
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = props.fieldMapToTime;

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey || !values[field]) {
        continue;
      }

      const [startTime, endTime]: string[] = values[field];

      values[startTimeKey] = dateUtil(startTime).format(format);
      values[endTimeKey] = dateUtil(endTime).format(format);
      Reflect.deleteProperty(values, field);
    }

    return values;
  }



  return { handleRangeTimeValue, handleFormValues }
}