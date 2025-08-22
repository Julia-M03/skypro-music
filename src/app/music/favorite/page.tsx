"use client";

import React, { useEffect } from "react";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { setCurrentTrackList } from "@/store/features/trackSlice";


export default function Favorite() {
    const dispatch = useAppDispatch();
  const favoriteTracks = useAppSelector(
    (state: RootState): TrackType[] => state.tracks.favoriteTracks
  );

  useEffect(() => {
    dispatch(setCurrentTrackList(favoriteTracks));
  }, [favoriteTracks, dispatch]);

  return <CenterBlock header="Мой плейлист" />
}
