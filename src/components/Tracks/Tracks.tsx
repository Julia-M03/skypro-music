import styles from "./tracks.module.css";
import { data } from "@/data";
import { TrackType } from "@/sharedTypes/sharedTypes";
import Track from "../Track/Track";


export default function Tracks() {
    return (
        <div className={styles.content__playlist}>
            {data.map((track: TrackType) => (
                <Track key={track._id} {...track} />
            ))}
        </div>
    )
}
