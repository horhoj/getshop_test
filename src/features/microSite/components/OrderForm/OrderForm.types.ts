export type OrderFormOperation = number | 'clear';

export interface OrderFormButtonItem {
  title: string;
  operation: OrderFormOperation;
  id: string;
}

export type OrderFormActiveButtonId =
  | OrderFormOperation
  | 'confirm'
  | 'close'
  | 'submit';

export interface OrderFormKeyboardDictionaryItem {
  ArrowUp?: OrderFormActiveButtonId;
  ArrowDown?: OrderFormActiveButtonId;
  ArrowLeft?: OrderFormActiveButtonId;
  ArrowRight?: OrderFormActiveButtonId;
}
