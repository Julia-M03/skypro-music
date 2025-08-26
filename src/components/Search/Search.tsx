'use client'

import styles from "./search.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFilterQuery } from "@/store/features/trackSlice";

export default function Search() {
    const dispatch = useAppDispatch();

    const searchInput = useAppSelector((s) => s.tracks.filters?.query) ?? "";

    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterQuery(e.target.value))
    }

    return (
        <div className={styles.centerblock__search}>
            <svg className={styles.search__svg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-search" />
            </svg>
            <input
                className={styles.search__text}
                type="search"
                placeholder="Поиск"
                name="search"
                value={searchInput}
                onChange={onSearchInput}
            />
        </div>
    )
}