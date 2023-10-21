import styles from './OrderPhonePhoneView.module.scss';

interface OrderPhonePhoneViewProps {
  phone: string;
  phonePrefix: string;
}

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

export function OrderPhonePhoneView({
  phone,
  phonePrefix,
}: OrderPhonePhoneViewProps) {
  return (
    <div className={styles.OrderPhonePhoneView}>
      {phonePrefix}
      {format(phone)}
    </div>
  );
}
