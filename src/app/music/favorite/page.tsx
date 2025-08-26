"use client";

import React, { useEffect } from "react";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { setCurrentPlaylist, setCurrentTrackList } from "@/store/features/trackSlice";
import useGetFavorites from "@/hooks/useGetFavorites";


export default function Favorite() {
  const dispatch = useAppDispatch();
  const favoriteTracks = useAppSelector(
    (state: RootState): TrackType[] => state.tracks.favoriteTracks
  );

  const { isLoadingFavorites } = useGetFavorites();

  useEffect(() => {
    dispatch(setCurrentTrackList(favoriteTracks));
    dispatch(setCurrentPlaylist(favoriteTracks));
  }, [favoriteTracks, isLoadingFavorites]);

  return <CenterBlock header="Мой плейлист" />
}
