import { useEffect, useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import { Video } from '../components/Video';
import { Banner } from '../components/Banner';
import { OrderForm } from '../components/OrderForm';
import { OrderAcceptedScreen } from '../components/OrderAcceptedScreen';

type Mode = 'banner' | 'video' | 'form' | 'orderAccepted';

export function MicroSiteWidget() {
  const [isStart, setIsStart] = useState(true);
  const [mode, setMode] = useState<Mode>('video');

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (mode === 'video') {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        setMode('banner');
      }, 2000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [mode]);

  return (
    <Wrapper>
      <Video
        isPlay={mode === 'video' || mode === 'banner'}
        setIsStart={setIsStart}
        isStart={isStart}
      />
      {mode === 'banner' && (
        <Banner
          onClick={() => {
            setMode('form');
            setIsStart(false);
          }}
        />
      )}
      {mode === 'form' && (
        <OrderForm
          onClose={() => setMode('video')}
          onSuccess={() => setMode('orderAccepted')}
        />
      )}
      {mode === 'orderAccepted' && (
        <OrderAcceptedScreen onClose={() => setMode('video')} />
      )}
    </Wrapper>
  );
}
