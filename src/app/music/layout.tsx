"use client";

import styles from "./layout.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { getTrack } from "@/services/tracks/tracksApi";
import { setTracks } from "@/store/features/trackSlice";
import Loading from "./loading";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";

type TracksLayoutProps = {
    children: React.ReactNode;
};

export default function TracksLayout({ children }: TracksLayoutProps) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await getTrack();
                dispatch(setTracks(response));
            } catch (error) {
                console.error("Ошибка при получении треков: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTracks();
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <Navigation />
                    {isLoading ? <Loading /> : children}
                    <Sidebar />
                </main>
                <Bar />
                <footer className="footer"></footer>
            </div>
        </div>
    )
}
