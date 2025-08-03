import styles from "./filter.module.css";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { data } from "@/data";
import { dateFormat, getUniqueValuesByKey } from "@/utils/helpers";

type FilterProps = {
  name: string;
  onClick: (name: string | null) => void;
  activeFilter: string | null;
  filterName: keyof TrackType;
};

export default function Filter({ name, activeFilter, filterName, onClick }: FilterProps) {
  return (
    <div className={styles.filter__button_group}>
      <div
        className={`${styles.filter__button} ${activeFilter === name ? styles.filter__button_active : ""}`}
        onClick={() => onClick(name)}> {name} </div>
      {activeFilter === name && (
        <div className={styles.filter__dropdown}>
          <div className={styles.filter__list}>
            {getUniqueValuesByKey(data, filterName).map((item, idx) => (
              <div
                key={String(item) + idx}
                className={styles.filter__list_element}
              >
                {filterName === "release_date"
                  ? dateFormat(String(item))
                  : String(item)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};