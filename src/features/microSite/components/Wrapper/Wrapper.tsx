import { ReactNode } from 'react';
import styles from './Wrapper.module.scss';

interface WrapperProps {
  children: ReactNode;
}
export function Wrapper({ children }: WrapperProps) {
  return (
    <div className={styles.Wrapper} onContextMenu={(e) => e.preventDefault()}>
      {children}
    </div>
  );
}
