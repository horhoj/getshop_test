import classNames from 'classnames';
import styles from './OrderFormCloseButton.module.scss';

interface OrderFormCloseButtonProps {
  onClose: () => void;
  isActive: boolean;
}
export function OrderFormCloseButton({
  onClose,
  isActive,
}: OrderFormCloseButtonProps) {
  return (
    <button
      className={classNames(
        styles.OrderFormCloseButton,
        isActive && styles.isActive,
      )}
      onClick={onClose}
    >
      X
    </button>
  );
}
