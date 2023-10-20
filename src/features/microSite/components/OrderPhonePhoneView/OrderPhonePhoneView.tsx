import styles from './OrderPhonePhoneView.module.scss';

interface OrderPhonePhoneViewProps {
  phone: string;
}

const format = (phone: string) => {
  let view = '+7(';

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

export function OrderPhonePhoneView({ phone }: OrderPhonePhoneViewProps) {
  return <div className={styles.OrderPhonePhoneView}>{format(phone)}</div>;
}
