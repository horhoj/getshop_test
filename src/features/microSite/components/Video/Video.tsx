import ReactPlayer from 'react-player';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Video.module.scss';
import video from '~/assets/volvo_truks.mp4';

interface VideoProps {
  isPlay: boolean;
  isStart: boolean;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Video({ isPlay, setIsStart, isStart }: VideoProps) {
  const ref = useRef<ReactPlayer>(null);

  const handlePlayBtnClk = () => {
    setIsStart(false);
  };

  return (
    <div className={classNames(styles.Video)}>
      <ReactPlayer
        url={video}
        width={1280}
        height={720}
        playing={isPlay && !isStart}
        ref={ref}
        muted={true}
        loop={true}
      />
      {isStart && (
        <div className={styles.playWrap}>
          <div>
            <button onClick={handlePlayBtnClk}>play</button>
          </div>
        </div>
      )}
    </div>
  );
}
