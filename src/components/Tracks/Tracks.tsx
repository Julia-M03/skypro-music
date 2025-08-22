"use client";

import styles from "./tracks.module.css";
import { TrackType } from "@/sharedTypes/sharedTypes";
import Track from "../Track/Track";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type TrackListProps = {
    selectId?: number;
    tracks?: TrackType[];
}

export default function Tracks({ selectId }: TrackListProps) {
    const tracks = useSelector(
        (state: RootState): TrackType[] => state.tracks.currentTrackList
    );

    return (
        <div className={styles.content__playlist}>
            {tracks.map((track: TrackType) => (
                <Track key={track._id} track={track} playList={tracks} />
            ))}
        </div>
    )
}
