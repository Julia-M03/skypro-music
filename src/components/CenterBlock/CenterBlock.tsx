import { TrackType } from "@/sharedTypes/sharedTypes";
import FilterItem from "../FilterItem/FilterItem";
import Search from "../Search/Search";
import styles from "./centerblock.module.css";
import classNames from "classnames";
import { data } from "@/data";
import Track from "../Track/Track";


export default function CenterBlock() {
    return (
        <div className={styles.centerblock}>

            <Search />

            <h2 className={styles.centerblock__h2}>Треки</h2>

            <FilterItem />

            <div className={styles.centerblock__content}>
                <div className={styles.content__title}>
                    <div className={classNames(styles.playlistTitle__col, styles.col01)}>Трек</div>
                    <div className={classNames(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
                    <div className={classNames(styles.playlistTitle__col, styles.col03)}>Альбом</div>
                    <div className={classNames(styles.playlistTitle__col, styles.col04)}>
                        <svg className={styles.playlistTitle__svg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>
                <div className={styles.content__playlist}>
                    {data.map((track: TrackType) => (
                        <Track key={track._id} track={track} playList={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};
