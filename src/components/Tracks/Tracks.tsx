"use client";

import styles from "./tracks.module.css";
import { TrackType } from "@/sharedTypes/sharedTypes";
import Track from "../Track/Track";
import { useSelector } from "react-redux";
import { selectVisibleTracks } from "@/store/selectors/tracksSelectors";


type TrackListProps = {
    tracks?: TrackType[];
}

export default function Tracks({ }: TrackListProps) {
  const tracks = useSelector(selectVisibleTracks);

    return (
        <div className={styles.content__playlist}>
            {tracks.map((track: TrackType) => (
                <Track key={track._id} track={track} playList={tracks} />
            ))}
        </div>
    )
}
