import { useState } from 'react';
import { Wrapper } from '../components/Wrapper';
import { Video } from '../components/Video';

type Mode = 'banner' | 'video' | 'form';

export function MicroSiteWidget() {
  const [isStart, setIsStart] = useState(true);
  const [mode, setMode] = useState<Mode>('video');

  return (
    <Wrapper>
      <Video
        isPlay={mode === 'video'}
        setIsStart={setIsStart}
        isStart={isStart}
      />
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
          setIsStart(false);
        }}
      >
        banner
      </button>
    </Wrapper>
  );
}
