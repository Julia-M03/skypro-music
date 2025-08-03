import FilterItem from "../FilterItem/FilterItem";
import Search from "../Search/Search";
import Tracks from "../Tracks/Tracks";
import styles from "./centerblock.module.css";
import classNames from "classnames";


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

                <Tracks />
            </div>
        </div>
    );
};
