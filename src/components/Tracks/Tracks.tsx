import styles from "./tracks.module.css";
import { formatTime } from "@/utils/helpers";
import { data } from "@/data";
import { TrackType } from "@/sharedTypes/sharedTypes";
import Track from "../Track/Track";


export default function Tracks() {
    return (
        <div className={styles.content__playlist}>
            {data.map((track: TrackType) => (
                <Track
                    title={track.name}
                    author={track.author}
                    album={track.album}
                    time={formatTime(track.duration_in_seconds)}
                    key={track._id}
                />
            ))}
        </div>
    )
}
