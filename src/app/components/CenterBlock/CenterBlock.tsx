import Filters from "../Filters/Filters";
import TrackList from "../TrackList/TrackList";
import styles from "./centerblock.module.css";
import classNames from "classnames";


export default function CenterBlock() {
    return (
        <div className={styles.centerblock}>
            <div className={styles.centerblock__search}>
                <svg className={styles.search__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                <input
                    className={styles.search__text}
                    type="search"
                    placeholder="Поиск"
                    name="search"
                />
            </div>
            <h2 className={styles.centerblock__h2}>Треки</h2>

            <Filters />
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

                <TrackList />
            </div>
        </div>
    );
};
