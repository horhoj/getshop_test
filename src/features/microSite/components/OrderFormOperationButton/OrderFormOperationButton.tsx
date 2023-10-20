import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './OrderFormOperationButton.module.scss';

interface OrderFormOperationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  isActive: boolean;
}

export function OrderFormOperationButton({
  children,
  isActive,
  ...props
}: OrderFormOperationButtonProps) {
  return (
    <button
      className={classNames(
        styles.OrderFormOperationButton,
        isActive && styles.isActive,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
