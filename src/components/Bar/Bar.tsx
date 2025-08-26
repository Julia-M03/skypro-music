"use client"
import Link from "next/link";
import styles from "./bar.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { setNextTrack, setPrevTrack, togglePlay, toggleShuffle } from "@/store/features/trackSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import { getTimePanel } from "@/utils/helpers";
import { useLikeTrack } from "@/hooks/useLikeTracks";

export default function Bar() {
  const dispatch = useAppDispatch();
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isShuffled, setIsShuffled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null);

  const isPlaying = useAppSelector(
    (state) => state.tracks.currentTrack.isPlaying
  );

  const currentTrack = useAppSelector(
    (state) => state.tracks.currentTrack.track
  );

  const { accessToken } = useAppSelector((state) => state.auth);
  
  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(togglePlay());
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && currentTrack && isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay failed", err);
      });
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(togglePlay());
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  if (!currentTrack) {
    return null;
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      dispatch(togglePlay());
    }
  };

  const onToggleLoop = () => {
    setIsLoop((prev) => !prev)
  }

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(togglePlay(true));
      setIsLoadedTrack(true);
    }
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value) / 100;

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const onChangeProgress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    setIsShuffled((prev) => !prev);
    dispatch(toggleShuffle());
  };

  const likeIcon = () => {
    if (!accessToken) {
      return "dislike-notauth";
    } else {
      return isLike ? "like" : "dislike";
    }
  };

  return (
    <div className={styles.bar}>
      <audio
        className={styles.bar__audio}
        ref={audioRef}
        src={currentTrack?.track_file}
        loop={isLoop}
        autoPlay
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onNextTrack}
      />
      <ProgressBar
        max={audioRef.current?.duration || 0}
        step={0.1}
        readOnly={!isLoadedTrack}
        value={currentTime}
        onChange={onChangeProgress}
      />
      <div className={styles.bar__content}>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className={classNames(styles.player__btnPlay, styles.btn)} onClick={handlePlayPause}>
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? "pause" : "play"}`} />
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div className={classNames(styles.player__btnRepeat, styles.btnIcon)} onClick={onToggleLoop}>
                <svg className={classNames(styles.player__btnRepeatSvg, {
                  [styles.player__btnRepeat_on]: isLoop,
                })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div className={classNames(styles.player__btnShuffle, styles.btnIcon)} onClick={onToggleShuffle}>
                <svg className={classNames(styles.player__btnShuffleSvg, {
                  [styles.player__btnShuffle_on]: isShuffled,
                })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike} onClick={toggleLike}>
                <div className={classNames(styles.player__btnShuffle, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref={`/img/icon/sprite_2.svg#icon-${likeIcon()}`} />
                  </svg>
                </div>
                <div className={classNames(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__rightBlock}>
            <div className={styles.bar__timeBlock}>
              {getTimePanel(currentTime, audioRef.current?.duration || 0)}
            </div>
            <div className={styles.bar__volumeBlock}>
              <div className={styles.volume__content}>
                <div className={styles.volume__image}>
                  <svg className={styles.volume__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                  </svg>
                </div>
                <div
                  className={classNames(styles.volume__progress, styles.btn)}
                >
                  <input
                    className={classNames(styles.volume__progressLine, styles.btn
                    )}
                    type="range"
                    name="range"
                    onChange={onVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}