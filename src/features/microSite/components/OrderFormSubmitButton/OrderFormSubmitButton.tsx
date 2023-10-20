import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './OrderFormSubmitButton.module.scss';

interface OrderFormSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  isActive: boolean;
}

export function OrderFormSubmitButton({
  children,
  isActive,
  ...props
}: OrderFormSubmitButtonProps) {
  return (
    <button
      className={classNames(
        styles.OrderFormSubmitButton,
        isActive && styles.isActive,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
