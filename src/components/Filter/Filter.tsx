import { setArtistFilters, setGenreFilters, setYearFilters } from "@/store/features/trackSlice";
import styles from "./filter.module.css";
import { selectFacetOptions } from "@/store/selectors/tracksSelectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";


type FacetType = "artists" | "years" | "genres";

type FilterProps = {
  label: string;
  facet: FacetType;
}

export default function Filter({ label, facet }: FilterProps) {
  const dispatch = useAppDispatch();
  const { artists, years, genres } = useAppSelector(selectFacetOptions);

  const selected = useAppSelector((s) => s.tracks.filters);
  const selectedValues =
    facet === "artists"
      ? selected.artists
      : facet === "years"
        ? selected.years.map(String)
        : selected.genres;

  const options =
    facet === "artists"
      ? artists
      : facet === "years"
        ? years.map(String)
        : genres;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleValue = (val: string) => {
    if (facet === "artists") {
      const next = selected.artists.includes(val)
        ? selected.artists.filter((x) => x !== val)
        : [...selected.artists, val];
      dispatch(setArtistFilters(next));
    } else if (facet === "years") {
      const next = selected.years.map(String).includes(val)
        ? selected.years.filter((x) => String(x) !== val)
        : [...selected.years, Number(val)];
      dispatch(setYearFilters(next));
    } else {
      const next = selected.genres.includes(val)
        ? selected.genres.filter((x) => x !== val)
        : [...selected.genres, val];
      dispatch(setGenreFilters(next));
    }
  };

  const clearFacet = () => {
    if (facet === "artists") dispatch(setArtistFilters([]));
    else if (facet === "years") dispatch(setYearFilters([]));
    else dispatch(setGenreFilters([]));
  };

  return (
    <div ref={rootRef} className={styles.filter__button_group}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: open || selectedValues.length > 0,
        })}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        {selectedValues.length > 0 && (
          <span className={styles.badge}>{selectedValues.length}</span>
        )}
        <svg className={styles.caret}>
          <use xlinkHref="/img/icon/sprite_3.svg#icon-caret"></use>
        </svg>
      </div>

      {open && (
        <div className={styles.filter__dropdown}>
          <div className={styles.filter__header}>
          </div>

          <div className={styles.filter__list}>
            {options.length === 0 && (
              <div className={styles.filter__empty}>Нет вариантов</div>
            )}

            {options.map((opt) => {
              const value = String(opt);
              const checked = selectedValues.includes(value);
              return (
                <label key={value} className={styles.filter__list_element}>
                  <input
                    className={styles.option__checkbox}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleValue(value)}
                  />
                  <span className={styles.option__label}>{`  ${value}`}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
