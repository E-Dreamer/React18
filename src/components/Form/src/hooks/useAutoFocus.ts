import { Ref } from 'react';
import { FormSchema } from './../types/form';
interface useAutoFoucsType {
  autoFocusFirstItem: boolean;
  schemas: FormSchema[];
  formRef: Ref<any>;
}

export function useAutoFoucs(props: useAutoFoucsType) {
  const { autoFocusFirstItem, schemas, formRef } = props;
  if (!autoFocusFirstItem) return;

  if (!schemas || schemas.length === 0) return;

  const firstItem = schemas[0]
  // Only open when the first form item is input type
  if (!firstItem.component.includes('Input')) {
    return;
  }
  const el = (formRef as any)?.$el as HTMLElement;
  const inputEl = el.querySelector('.ant-row:first-child input') as Nullable<HTMLInputElement>;
  if (!inputEl) return;
  inputEl?.focus()
}