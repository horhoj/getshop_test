import { useEffect, useState } from 'react';
import { OrderFormCloseButton } from '../OrderFormCloseButton';
import { OrderFormOperationButton } from '../OrderFormOperationButton';
import { OrderFormQrCode } from '../OrderFormQrCode';
import { OrderPhonePhoneView } from '../OrderPhonePhoneView';
import { OrderFormConfirmButton } from '../OrderFormConfirmButton';
import { OrderFormSubmitButton } from '../OrderFormSubmitButton';
import styles from './OrderForm.module.scss';
import {
  OrderFormActiveButtonId,
  OrderFormButtonItem,
  OrderFormOperation,
} from './OrderForm.types';
import { orderFormGetNextButton } from './OrderForm.helpers';
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

  const isAllowConfirmation = isConfirm && phone.length === 10;

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
    onSuccess();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'F12') {
        e.preventDefault();
      }

      if (DIGITS.includes(e.key)) {
        const key = Number.parseInt(e.key);
        handleOperation(key);
      }
      if (e.key === 'Backspace') {
        handleOperation('clear');
      }
      if (e.key === 'Escape') {
        onClose();
      }
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        const nextKey = orderFormGetNextButton(activeButtonId, e.key);

        if (nextKey !== undefined) {
          if (nextKey === 'submit' && !isAllowConfirmation) {
            return;
          }
          setActiveButtonId(nextKey);
        }
      }
      if (e.key === 'Enter') {
        if (typeof activeButtonId === 'number') {
          handleOperation(activeButtonId);
          return;
        }
        if (activeButtonId === 'clear') {
          handleOperation('clear');
          return;
        }
        if (activeButtonId === 'close') {
          onClose();
          return;
        }
        if (activeButtonId === 'submit') {
          handleSubmit();
          return;
        }
        if (activeButtonId === 'confirm') {
          handleConfirm();
        }
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
          <OrderPhonePhoneView phone={phone} phonePrefix={PHONE_PREFIX} />
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
        <div className={styles.confirmBlock}>
          <OrderFormConfirmButton
            isConfirm={isConfirm}
            onClick={handleConfirm}
            isActive={activeButtonId === 'confirm'}
          />
          <div>Согласие на обработку персональных данных</div>
        </div>
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
