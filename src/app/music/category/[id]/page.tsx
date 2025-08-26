"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getTracksSelection } from "@/services/tracks/tracksApi";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { setCurrentPlaylist, setCurrentTrackList } from "@/store/features/trackSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Loading from "../../loading";
import { TrackType } from "@/sharedTypes/sharedTypes";
import useInitAuth from "@/hooks/useInitAuth";
import useGetFavorites from "@/hooks/useGetFavorites";
import useGetTracks from "@/hooks/useGetTracks";


export default function CategoryPage() {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const [playListName, setPlayListName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const tracks = useSelector(
    (state: RootState): TrackType[] => state.tracks.tracks
  )

  const formTrackList = (tracks: TrackType[], playListItems: number[]) => {
    return tracks.filter((track) => playListItems.includes(track._id))
  };

  useGetTracks();
  useGetFavorites();

  useEffect(() => {
    if (!tracks)
      return

    const getSelection = async () => {
      try {
        const response = await getTracksSelection({ id: Number(id) + 1 })
        setPlayListName(response.name)

        const catalog = formTrackList(tracks, response.items)

        dispatch(setCurrentTrackList(catalog));
        dispatch(setCurrentPlaylist(catalog));
      } catch (error) {
        console.error("Ошибка при получении плейлиста:", error)
      } finally {
        setIsLoading(false);
      }
    }
    getSelection()
  }, [id, tracks])

  if (isLoading) {
    return <Loading />
  }
  return <CenterBlock header={playListName} />
}
