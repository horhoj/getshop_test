import { useEffect, useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import { Video } from '../components/Video';
import { Banner } from '../components/Banner';

type Mode = 'banner' | 'video' | 'form';

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
      }, 5000);
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
      <button
        onClick={() => {
          setMode('video');
          setIsStart(false);
        }}
      >
        video
      </button>
      <button
        onClick={() => {
          setMode('banner');
        }}
      >
        banner
      </button>
    </Wrapper>
  );
}
