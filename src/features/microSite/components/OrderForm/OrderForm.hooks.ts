import { useEffect, useState } from 'react';
import { numVerify } from '../../api/numVerify';

type Status =
  | 'INPUT_NOT_COMPETE'
  | 'VALID'
  | 'NOT_VALID'
  | 'FAILED_TO_VALIDATE'
  | 'VALIDATION_IN_PROGRESS';

export const useNumVerify = (number: string) => {
  const [status, setStatus] = useState<Status>('INPUT_NOT_COMPETE');

  useEffect(() => {
    const request = async () => {
      try {
        setStatus('VALIDATION_IN_PROGRESS');
        const result = await numVerify(number);
        if (result) {
          setStatus('VALID');
        } else {
          setStatus('NOT_VALID');
        }
      } catch (e) {
        setStatus('FAILED_TO_VALIDATE');
      }
    };

    if (number.length === 10) {
      request();
    } else {
      setStatus('INPUT_NOT_COMPETE');
    }
  }, [number, setStatus]);

  return status;
};
