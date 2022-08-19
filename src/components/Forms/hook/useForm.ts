import { isEmpty } from "@/utils/is";
import { useState } from "react";
import { useFormProps, FormActionType } from "../types/form";

/*
 * @Author: E-Dreamer
 * @Date: 2022-08-19 09:45:52
 * @LastEditTime: 2022-08-19 13:56:35
 * @LastEditors: E-Dreamer
 * @Description: 
 */
export default function useForm(params: useFormProps) {
  const [paramState, setParmaState] = useState(params)
  const register = (instance: FormActionType) => {
    if(instance){
      instance.setProps(paramState)
    }
  }
  const methods = {

  }

  return [register, methods]
}