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

export type Arrows = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';

export type OrderFormKeyboardDictionaryItem = Partial<
  Record<Arrows, OrderFormActiveButtonId>
>;
