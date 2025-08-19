"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { setCurrentTrackList, setCurrentPlaylist } from "@/store/features/trackSlice";
import { RootState } from "@/store/store";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { TrackType } from "@/sharedTypes/sharedTypes";

export default function Home() {
  const dispatch = useAppDispatch();
  const tracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  );

  useEffect(() => {
    dispatch(setCurrentTrackList(tracks))
    dispatch(setCurrentPlaylist(tracks))
  }, [tracks, dispatch]);

  return <CenterBlock header="Треки" />
}


// import Navigation from '@/components/Navigation/Navigation';
// import './page.css';
// import styles from './page.module.css';
// import CenterBlock from '@/components/CenterBlock/CenterBlock';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';


// export default function Home() {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <Navigation />

//           <CenterBlock />

//           <Sidebar />
//         </main>

//         <Bar />

//         <footer className="footer"></footer>
//       </div>
//     </div>
//   )
// }