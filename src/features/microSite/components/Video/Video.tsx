import ReactPlayer from 'react-player';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key !== 'F12') {
        e.preventDefault();
      }
      if (e.key === 'Enter') {
        handlePlayBtnClk();
      }
    };
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('keydown', handle);
    };
  }, [handlePlayBtnClk]);

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
            <button onClick={handlePlayBtnClk} className={styles.playButton}>
              кликните или нажмите Enter для начала воспроизведения
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
