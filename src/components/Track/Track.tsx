"use client"
import Link from "next/link";
import styles from "./track.module.css";


type TrackProps = {
    title: string;
    subTitle?: string;
    author: string;
    album: string;
    time: string;
}

export default function Track({ title, subTitle, author, album, time }: TrackProps) {
    return (
        <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                    <div className={styles.track__titleImage}>
                        <svg className={styles.track__titleSvg}>
                            <use xlinkHref="/img/icon/Group.svg"></use>
                            <use xlinkHref="/img/icon/sprite.svg"></use>
                        </svg>
                    </div>
                    <div>
                        <Link className={styles.track__titleLink} href="">
                            {title}{" "}
                            <span className={styles.track__titleSpan}>{subTitle}</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.track__author}>
                    <Link className={styles.track__authorLink} href="">
                        {author}
                    </Link>
                </div>
                <div className={styles.track__album}>
                    <Link className={styles.track__albumLink} href="">
                        {album}
                    </Link>
                </div>
                <div className={styles.track__time}>
                    <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/img/icon/Vector.svg"></use>
                    </svg>
                    <span className={styles.track__timeText}>{time}</span>
                </div>
            </div>
        </div>
    )
}
