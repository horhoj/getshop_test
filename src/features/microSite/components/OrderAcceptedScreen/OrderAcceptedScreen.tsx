import { useEffect } from 'react';
import { OrderFormCloseButton } from '../OrderFormCloseButton';
import { OrderFormQrCode } from '../OrderFormQrCode';
import styles from './OrderAcceptedScreen.module.scss';

interface OrderAcceptedScreenProps {
  onClose: () => void;
}
export function OrderAcceptedScreen({ onClose }: OrderAcceptedScreenProps) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Enter' || e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('keydown', handle);
    };
  }, [onClose]);

  return (
    <>
      <div className={styles.OrderAcceptedScreen}>
        <div className={styles.title}>ЗАЯВКА ПРИНЯТА</div>
        <div className={styles.text}>
          <div>Держите телефон под рукой.</div>
          <div>Скоро с Вами свяжется наш менеджер.</div>
        </div>
      </div>
      <OrderFormCloseButton onClose={onClose} isActive={true} />
      <OrderFormQrCode />
    </>
  );
}
