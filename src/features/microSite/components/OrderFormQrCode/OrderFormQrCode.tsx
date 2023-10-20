import styles from './OrderFormQrCode.module.scss';
import qrCode from '~/assets/qr-code.png';

export function OrderFormQrCode() {
  return (
    <div className={styles.OrderFormQrCode}>
      <div className={styles.text}>
        Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
      </div>
      <div>
        <img src={qrCode} alt="QrCode" />
      </div>
    </div>
  );
}
