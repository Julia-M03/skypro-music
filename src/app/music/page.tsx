"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { setCurrentPlaylist } from "@/store/features/trackSlice";
import { RootState, useAppSelector } from "@/store/store";
import { setCurrentTrackList } from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Loading from "./loading";
import type { TrackType } from "@/sharedTypes/sharedTypes";
import useGetFavorites from "@/hooks/useGetFavorites";
import useGetTracks from "@/hooks/useGetTracks";

export default function Home() {
  const dispatch = useAppDispatch();

  const { isLoading } = useGetTracks();
  const { isLoadingFavorites } = useGetFavorites();

  const tracks = useAppSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  );

  useEffect(() => {
    dispatch(setCurrentTrackList(tracks))
    dispatch(setCurrentPlaylist(tracks))
  }, [tracks, dispatch]);

  return (
    <>
     {isLoading || isLoadingFavorites ? <Loading /> : <CenterBlock header="Треки" />}
    </>
  )
}
