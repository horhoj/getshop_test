import { useState } from 'react';
import { OrderFormCloseButton } from '../OrderFormCloseButton';
import { OrderFormOperationButton } from '../OrderFormOperationButton';
import { OrderFormQrCode } from '../OrderFormQrCode';
import { OrderPhonePhoneView } from '../OrderPhonePhoneView';
import { OrderFormConfirmButton } from '../OrderFormConfirmButton';
import { OrderFormSubmitButton } from '../OrderFormSubmitButton';
import styles from './OrderForm.module.scss';
import { getUUID } from '~/utils/getUUID';

type Operation = number | 'clear';

interface ButtonItem {
  title: string;
  operation: Operation;
  id: string;
}

type ActiveButtonId = Operation | 'confirm' | 'close' | 'submit';

const BUTTON_LIST: ButtonItem[] = [
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

interface OrderFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function OrderForm({ onClose, onSuccess }: OrderFormProps) {
  const [phone, setPhone] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState<ActiveButtonId | null>(
    null,
  );

  const isAllowConfirmation = isConfirm && phone.length === 10;

  const handleOperation = (operation: Operation) => {
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

  return (
    <>
      <div className={styles.OrderForm}>
        <div className={styles.title}>
          Введите ваш номер мобильного телефона
        </div>
        <div className={styles.number}>
          <OrderPhonePhoneView phone={phone} />
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
