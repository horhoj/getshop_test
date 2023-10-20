import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './OrderFormConfirmButton.module.scss';
import { CheckIcon } from '~/assets/icons';

interface OrderFormConfirmButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isConfirm: boolean;
  isActive: boolean;
}
export function OrderFormConfirmButton({
  isConfirm,
  isActive,
  ...props
}: OrderFormConfirmButtonProps) {
  return (
    <button
      className={classNames(
        styles.OrderFormConfirmButton,
        isActive && styles.isActive,
      )}
      {...props}
    >
      {isConfirm && <CheckIcon variant={isActive ? 'white' : 'black'} />}
    </button>
  );
}
