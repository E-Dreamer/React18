import { useEffect, useState } from "react";
import { useFormProps, FormActionType } from "../types/form";

/*
 * @Author: E-Dreamer
 * @Date: 2022-08-19 09:45:52
 * @LastEditTime: 2022-08-25 09:09:02
 * @LastEditors: E-Dreamer
 * @Description: 
 */
export default function useForm(params: useFormProps) {
  const [formAction, setFormAction] = useState<FormActionType | null>(null)
  const register = (instance: FormActionType) => {
    setFormAction(instance)
    if (Object.keys(instance).length) {
      instance.setProps(params)
    }
  }

  useEffect(() => {
    formAction?.setProps(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])
  const methods = {

  }

  return [register, methods]
}