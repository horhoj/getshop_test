import { useEffect } from 'react';
import styles from './Banner.module.scss';
import qrCode from '~/assets/qr-code.png';

interface BannerProps {
  onClick: () => void;
}

export function Banner({ onClick }: BannerProps) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Enter') {
        onClick();
      }
    };
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('keydown', handle);
    };
  }, [onClick]);

  return (
    <div className={styles.Banner}>
      <div className={styles.title}>
        <div>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!</div>
        <div>ПОДАРИТЕ ЕМУ СОБАКУ!</div>
      </div>

      <img src={qrCode} alt="QrCode" />

      <div className={styles.help}>Сканируйте QR-код или нажмите ОК</div>
      <button onClick={onClick} className={styles.button}>
        ОК
      </button>
    </div>
  );
}
