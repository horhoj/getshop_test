import classNames from 'classnames';
import styles from './OrderPhonePhoneView.module.scss';

const format = (phone: string) => {
  let view = '(';

  for (let index = 0; index < 10; index++) {
    if (index === 3) {
      view += ')';
    }
    if (index === 6 || index === 8) {
      view += '-';
    }
    const char = phone[index];
    view += char ? char : '_';
  }

  return view;
};

interface OrderPhonePhoneViewProps {
  phone: string;
  phonePrefix: string;
  isNotValid: boolean;
}

export function OrderPhonePhoneView({
  phone,
  phonePrefix,
  isNotValid,
}: OrderPhonePhoneViewProps) {
  return (
    <div
      className={classNames(
        styles.OrderPhonePhoneView,
        isNotValid && styles.notValid,
      )}
    >
      {phonePrefix}
      {format(phone)}
    </div>
  );
}
