"use client"
import styles from "./filteritem.module.css";
import { useState } from "react";
import Filter from "../Filter/Filter";

export default function FilterItem() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleFilterClick = (name: string | null) => {
    setActiveFilter(activeFilter === name ? null : name);
  }

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <Filter
        name="исполнителю"
        activeFilter={activeFilter}
        filterName="author"
        onClick={handleFilterClick}
      />
      <Filter
        name="году выпуска"
        activeFilter={activeFilter}
        filterName="release_date"
        onClick={handleFilterClick}
      />
      <Filter
        name="жанру"
        activeFilter={activeFilter}
        filterName="genre"
        onClick={handleFilterClick}
      />
    </div>
  )
}
