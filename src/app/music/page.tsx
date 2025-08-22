"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { getTrack, tracksGetFavorites } from "@/services/tracks/tracksApi";
import { setTracks, setFavoriteTracks } from "@/store/features/trackSlice";
import { RootState, useAppSelector } from "@/store/store";
import { setCurrentTrackList } from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Loading from "./loading";
import type { TrackType } from "@/sharedTypes/sharedTypes";
import { withReauth } from "@/utils/withReauth";
import useInitAuth from "@/hooks/useInitAuth";

export default function Home() {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

  useInitAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(
    accessToken ? true : false
  );

  const tracks = useAppSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  );

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
    };

    fetchTracks();
  }, [dispatch]);

  useEffect(() => {
    if (!accessToken)
      return

    try {
      const fetchFavoriteTracks = async () => {
        withReauth(
          (newToken) => tracksGetFavorites(newToken || accessToken),
          refreshToken,
          dispatch
        ).then((favoritesResponse) => {
          dispatch(setFavoriteTracks(favoritesResponse));
        });
      };
      fetchFavoriteTracks();
    } catch (error) {
      console.error("Ошибка при получении избранных треков: ", error);
    } finally {
      setIsLoadingFavorites(false);
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(setCurrentTrackList(tracks))
    // dispatch(setCurrentPlaylist(tracks))
  }, [tracks, dispatch]);

  return (
    <>
     {isLoading || isLoadingFavorites ? <Loading /> : <CenterBlock header="Треки" />}
    </>
  )
}
