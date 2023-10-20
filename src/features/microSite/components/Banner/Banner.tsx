import styles from './Banner.module.scss';
import qrCode from '~/assets/qr-code.png';

interface BannerProps {
  onClick: () => void;
}

export function Banner({ onClick }: BannerProps) {
  return (
    <div className={styles.Banner}>
      <div className={styles.title}>
        <div>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!</div>
        <div>ПОДАРИТЕ ЕМУ СОБАКУ!</div>
      </div>

      <img src={qrCode} alt="" />

      <div className={styles.help}>Сканируйте QR-код или нажмите ОК</div>
      <button onClick={onClick} className={styles.button}>
        ОК
      </button>
    </div>
  );
}
