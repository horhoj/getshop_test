import {
  Arrows,
  OrderFormActiveButtonId,
  OrderFormKeyboardDictionaryItem,
} from './OrderForm.types';

export const orderFormGetNextButton = (
  currentButton: OrderFormActiveButtonId,
  arrow: Arrows,
) => {
  //В общем более приемлемого решения чем задать через словарь для кнопок не нашел
  //Идея в том, что по нажатой кнопке и типу нажатой стрелки, через словарь определяем
  //на какую следующую кнопку перейти
  const DIC: Record<OrderFormActiveButtonId, OrderFormKeyboardDictionaryItem> =
    {
      1: { ArrowRight: 2, ArrowDown: 4 },
      2: { ArrowLeft: 1, ArrowRight: 3, ArrowDown: 5 },
      3: { ArrowLeft: 2, ArrowDown: 6, ArrowRight: 'close' },
      4: { ArrowUp: 1, ArrowRight: 5, ArrowDown: 7 },
      5: { ArrowUp: 2, ArrowRight: 6, ArrowDown: 8, ArrowLeft: 4 },
      6: { ArrowUp: 3, ArrowDown: 9, ArrowLeft: 5, ArrowRight: 'close' },
      7: { ArrowUp: 4, ArrowRight: 8, ArrowDown: 'clear' },
      8: { ArrowUp: 5, ArrowRight: 9, ArrowDown: 'clear', ArrowLeft: 7 },
      9: { ArrowUp: 6, ArrowDown: 0, ArrowLeft: 8, ArrowRight: 'close' },
      clear: { ArrowUp: 7, ArrowRight: 0, ArrowDown: 'confirm' },
      0: {
        ArrowUp: 9,
        ArrowLeft: 'clear',
        ArrowDown: 'confirm',
        ArrowRight: 'close',
      },
      close: { ArrowLeft: 3 },
      confirm: { ArrowUp: 'clear', ArrowDown: 'submit', ArrowRight: 'close' },
      submit: { ArrowUp: 'confirm', ArrowRight: 'close' },
    };

  const key = DIC[currentButton][arrow];

  return key;
};
