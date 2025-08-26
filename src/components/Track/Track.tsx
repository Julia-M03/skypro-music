"use client"

import Link from "next/link";
import styles from "./track.module.css";
import { setCurrentPlaylist, setCurrentTrack } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { formatTime } from "@/utils/helpers";
import { TrackType } from "@/sharedTypes/sharedTypes";
import classNames from "classnames";
import { useLikeTrack } from "@/hooks/useLikeTracks";
import Image from "next/image";


type TrackProps = {
    track: TrackType;
    playList: TrackType[];
};

export default function Track({ track, playList }: TrackProps) {
    const dispatch = useAppDispatch();
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack.track);
    const isPlaying = useAppSelector((state) => state.tracks.currentTrack.isPlaying);
    const isCurrentTrack = currentTrack?._id === track._id;
    const { accessToken } = useAppSelector((state) => state.auth);
    const { toggleLike, isLike } = useLikeTrack(track);

    const likeIcon = () => {
        if (!accessToken) {
            return "dislike-notauth";
        } else {
            return isLike ? "like" : "dislike";
        }
    };

    const onClickCurrentTrack = () => {
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentPlaylist(playList));
    };

    return (
        <div className={styles.playlist__item} onClick={onClickCurrentTrack}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                    <div className={styles.track__titleImage}>
                        {isCurrentTrack ? (
                            <Image
                                className={classNames({ [styles.track__titleImg]: isPlaying, })}
                                src="/img/icon/current.svg"
                                alt={track.name}
                                width={16}
                                height={16}
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
                    <svg className={styles.track__timeSvg} onClick={(e) => {
                            e.stopPropagation();
                            toggleLike();
                        }}
                    >
                        <use href={`/img/icon/sprite_2.svg#icon-${likeIcon()}`}/>
                    </svg>
                    <span className={styles.track__timeText}>
                        {formatTime(track.duration_in_seconds)}
                    </span>
                </div>
            </div>
        </div >
    )
}
