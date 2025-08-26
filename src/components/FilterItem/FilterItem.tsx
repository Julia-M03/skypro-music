"use client"

import styles from "./filteritem.module.css";
import Filter from "../Filter/Filter";


export default function FilterItem() {

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <Filter
        label="исполнителю" 
        facet="artists"
      />
      <Filter
        label="году выпуска" 
        facet="years"
      />
      <Filter
        label="жанру" 
        facet="genres"
      />
    </div>
  )
}
