"use client"
import Link from "next/link";
import styles from "./track.module.css";
import { setCurrentTrack } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { formatTime } from "@/utils/helpers";
import { TrackType } from "@/sharedTypes/sharedTypes";
import classNames from "classnames";


export default function Track(track: TrackType) {
    const dispatch = useAppDispatch();
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack.track);
    const isPlaying = useAppSelector((state) => state.tracks.currentTrack.isPlaying);
    const isCurrentTrack = currentTrack?._id === track._id;

    return (
        <div className={styles.playlist__item} onClick={() => dispatch(setCurrentTrack(track))}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                    <div className={styles.track__titleImage}>
                        {isCurrentTrack ? (
                            <img className={classNames({ [styles.track__titleImg]: isPlaying, })}
                                 src="/img/icon/current.svg"
                                 alt={track.name}
                            />
                        ) : (
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref={`/img/icon/sprite.svg#icon-note`} />
                            </svg>
                        )}
                    </div>
                    <div>
                        <Link className={styles.track__titleLink} href="">
                            {track.name}
                        </Link>
                    </div>
                </div>
                <div className={styles.track__author}>
                    <Link className={styles.track__authorLink} href="">
                        {track.author}
                    </Link>
                </div>
                <div className={styles.track__album}>
                    <Link className={styles.track__albumLink} href="">
                        {track.album}
                    </Link>
                </div>
                <div className={styles.track__time}>
                    <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                    <span className={styles.track__timeText}>
                        {formatTime(track.duration_in_seconds)}
                    </span>
                </div>
            </div>
        </div >
    )
}
