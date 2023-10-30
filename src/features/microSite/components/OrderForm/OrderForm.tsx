import { useEffect, useState } from 'react';
import { OrderFormCloseButton } from '../OrderFormCloseButton';
import { OrderFormOperationButton } from '../OrderFormOperationButton';
import { OrderFormQrCode } from '../OrderFormQrCode';
import { OrderPhonePhoneView } from '../OrderPhonePhoneView';
import { OrderFormConfirmButton } from '../OrderFormConfirmButton';
import { OrderFormSubmitButton } from '../OrderFormSubmitButton';
import styles from './OrderForm.module.scss';
import {
  Arrows,
  OrderFormActiveButtonId,
  OrderFormButtonItem,
  OrderFormOperation,
} from './OrderForm.types';
import { orderFormGetNextButton } from './OrderForm.helpers';
import { useNumVerify } from './OrderForm.hooks';
import { getUUID } from '~/utils/getUUID';

const BUTTON_LIST: OrderFormButtonItem[] = [
  ...Array(9)
    .fill(null)
    .map((_, index) => ({
      id: getUUID(),
      title: (index + 1).toString(),
      operation: index + 1,
    })),
  { id: getUUID(), operation: 'clear', title: 'СТЕРЕТЬ' },
  { id: getUUID(), operation: 0, title: '0' },
];

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const DEFAULT_ACTIVE_BUTTON = 1;
const PHONE_PREFIX = '+7';
const ARROWS: Arrows[] = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];

interface OrderFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderForm({ onClose, onSuccess }: OrderFormProps) {
  const [phone, setPhone] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState<OrderFormActiveButtonId>(
    DEFAULT_ACTIVE_BUTTON,
  );

  const numVerifyResult = useNumVerify(phone);

  const isAllowConfirmation =
    isConfirm &&
    phone.length === 10 &&
    numVerifyResult !== 'NOT_VALID' &&
    numVerifyResult !== 'VALIDATION_IN_PROGRESS';

  const handleOperation = (operation: OrderFormOperation) => {
    setActiveButtonId(operation);
    if (operation === 'clear' && phone.length > 0) {
      setPhone((prev) => prev.slice(0, -1));
    }

    if (operation !== 'clear' && phone.length < 10) {
      setPhone((prev) => `${prev}${operation}`);
    }
  };

  const handleConfirm = () => {
    setActiveButtonId('confirm');
    setIsConfirm((prev) => !prev);
  };

  const handleSubmit = () => {
    setActiveButtonId('submit');
    //ЗДЕСЬ МОЖНО ОТПРАВИТЬ РЕАЛЬНЫЙ ЗАПРОС НА ЗАЯВКУ
    // eslint-disable-next-line no-console
    console.log('ЗАЯВКА ОТПРАВЛЕНА');
    onSuccess();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const handleNumericKeyPress = () => {
        const key = Number.parseInt(e.key);
        handleOperation(key);
      };

      const handleArrowPressKey = () => {
        const nextKey = orderFormGetNextButton(activeButtonId, e.key as Arrows);

        if (nextKey !== undefined) {
          if (nextKey === 'submit' && !isAllowConfirmation) {
            return;
          }
          if (nextKey === 'confirm' && numVerifyResult === 'NOT_VALID') {
            return;
          }
          setActiveButtonId(nextKey);
        }
      };

      const handleEnterPressKey = () => {
        const ENTER_KEYMAP: Record<OrderFormActiveButtonId, () => void> = {
          submit: handleSubmit,
          confirm: handleConfirm,
          clear: () => handleOperation('clear'),
          close: onClose,
        };

        Array(10)
          .fill(null)
          .forEach((_, index) => {
            ENTER_KEYMAP[index] = () => handleOperation(index);
          });

        const currentAction = ENTER_KEYMAP[activeButtonId];
        if (currentAction) {
          currentAction();
        }
      };

      const KEYMAP: Record<string, () => void> = {
        F12: () => e.preventDefault(),
        Backspace: () => handleOperation('clear'),
        Escape: onClose,
        Enter: handleEnterPressKey,
      };

      DIGITS.forEach((item) => (KEYMAP[item] = handleNumericKeyPress));
      ARROWS.forEach((item) => (KEYMAP[item] = handleArrowPressKey));

      const currentAction = KEYMAP[e.key];
      if (currentAction) {
        currentAction();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [
    handleOperation,
    onClose,
    activeButtonId,
    setActiveButtonId,
    handleConfirm,
    handleSubmit,
  ]);

  return (
    <>
      <div className={styles.OrderForm}>
        <div className={styles.title}>
          Введите ваш номер мобильного телефона
        </div>
        <div className={styles.number}>
          <OrderPhonePhoneView
            phone={phone}
            phonePrefix={PHONE_PREFIX}
            isNotValid={numVerifyResult === 'NOT_VALID'}
          />
        </div>
        <div className={styles.help}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </div>
        <div className={styles.buttonsBlock}>
          {BUTTON_LIST.map((item) => (
            <OrderFormOperationButton
              isActive={activeButtonId === item.operation}
              key={item.id}
              onClick={() => handleOperation(item.operation)}
              style={{ gridArea: `btn_${item.operation}` }}
              tabIndex={-1}
            >
              {item.title}
            </OrderFormOperationButton>
          ))}
        </div>

        {numVerifyResult === 'NOT_VALID' ? (
          <div className={styles.numberNotValidBlock}>Неверно введён номер</div>
        ) : (
          <div className={styles.confirmBlock}>
            <OrderFormConfirmButton
              isConfirm={isConfirm}
              onClick={handleConfirm}
              isActive={activeButtonId === 'confirm'}
            />
            <div>Согласие на обработку персональных данных</div>
          </div>
        )}

        <div className={styles.submitBlock}>
          <OrderFormSubmitButton
            disabled={!isAllowConfirmation}
            onClick={handleSubmit}
            isActive={activeButtonId === 'submit'}
          >
            Подтвердить номер
          </OrderFormSubmitButton>
        </div>
      </div>
      <OrderFormCloseButton
        onClose={onClose}
        isActive={activeButtonId === 'close'}
      />
      <OrderFormQrCode />
    </>
  );
}
