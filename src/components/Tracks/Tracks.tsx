import styles from "./tracks.module.css";
import { TrackType } from "@/sharedTypes/sharedTypes";
import Track from "../Track/Track";
import { data } from "@/data";

export default function Tracks() {
    return (
        <div className={styles.content__playlist}>
            {data.map((track: TrackType) => (
                <Track key={track._id} track={track} playList={data} />
            ))}
        </div>
    )
}
