import Link from "next/link";
import styles from "./tracklist.module.css";


export default function TrackList() {
    return (
        <div className={styles.content__playlist}>
            <div className={styles.playlist__item}>
                <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                        <div className={styles.track__titleImage}>
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        </div>
                        <div className="track__title-text">
                            <Link className={styles.track__titleLink} href="">
                                Guilt <span className={styles.track__titleSpan}></span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.track__author}>
                        <Link className={styles.track__authorLink} href="">
                            Nero
                        </Link>
                    </div>
                    <div className={styles.track__album}>
                        <Link className={styles.track__albumLink} href="">
                            Welcome Reality
                        </Link>
                    </div>
                    <div className="track__time">
                        <svg className={styles.track__timeSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className={styles.track__timeText}>4:44</span>
                    </div>
                </div>
            </div>

            <div className={styles.playlist__item}>
                <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                        <div className={styles.track__titleImage}>
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        </div>
                        <div className="track__title-text">
                            <Link className={styles.track__titleLink} href="">
                                Elektro <span className={styles.track__titleSpan}></span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.track__author}>
                        <Link className={styles.track__authorLink} href="">
                            Dynoro, Outwork, Mr. Gee
                        </Link>
                    </div>
                    <div className={styles.track__album}>
                        <Link className={styles.track__albumLink} href="">
                            Elektro
                        </Link>
                    </div>
                    <div className="track__time">
                        <svg className={styles.track__timeSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className={styles.track__timeText}>2:22</span>
                    </div>
                </div>
            </div>

            <div className={styles.playlist__item}>
                <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                        <div className={styles.track__titleImage}>
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        </div>
                        <div className="track__title-text">
                            <Link className={styles.track__titleLink} href="">
                                I’m Fire <span className={styles.track__titleSpan}></span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.track__author}>
                        <Link className={styles.track__authorLink} href="">
                            Ali Bakgor
                        </Link>
                    </div>
                    <div className={styles.track__album}>
                        <Link className={styles.track__albumLink} href="">
                            I’m Fire
                        </Link>
                    </div>
                    <div className="track__time">
                        <svg className={styles.track__timeSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className={styles.track__timeText}>2:22</span>
                    </div>
                </div>
            </div>

            <div className={styles.playlist__item}>
                <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                        <div className={styles.track__titleImage}>
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        </div>
                        <div className="track__title-text">
                            <Link className={styles.track__titleLink} href="">
                                Non Stop
                                <span className={styles.track__titleSpan}>(Remix)</span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.track__author}>
                        <Link className={styles.track__authorLink} href="">
                            Стоункат, Psychopath
                        </Link>
                    </div>
                    <div className={styles.track__album}>
                        <Link className={styles.track__albumLink} href="">
                            Non Stop
                        </Link>
                    </div>
                    <div className="track__time">
                        <svg className={styles.track__timeSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className={styles.track__timeText}>4:12</span>
                    </div>
                </div>
            </div>

            <div className={styles.playlist__item}>
                <div className={styles.playlist__track}>
                    <div className={styles.track__title}>
                        <div className={styles.track__titleImage}>
                            <svg className={styles.track__titleSvg}>
                                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                            </svg>
                        </div>
                        <div>
                            <Link className={styles.track__titleLink} href="">
                                Run Run
                                <span className={styles.track__titleSpan}>
                                    (feat. AR/CO)
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.track__author}>
                        <Link className={styles.track__authorLink} href="">
                            Jaded, Will Clarke, AR/CO
                        </Link>
                    </div>
                    <div className={styles.track__album}>
                        <Link className={styles.track__albumLink} href="">
                            Run Run
                        </Link>
                    </div>
                    <div className="track__time">
                        <svg className={styles.track__timeSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                        </svg>
                        <span className={styles.track__timeText}>2:54</span>
                    </div>
                </div>
            </div>
        </div>
    );
};