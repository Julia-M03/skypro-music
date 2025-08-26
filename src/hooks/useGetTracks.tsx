import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { getTrack } from "@/services/tracks/tracksApi";
import { setTracks } from "@/store/features/trackSlice";
import useInitAuth from "@/hooks/useInitAuth";


interface IHookResult {
    isLoading: boolean
}

export default function useGetTracks(): IHookResult {
  const dispatch = useAppDispatch();

  useInitAuth();

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
    };

    fetchTracks();
  }, [dispatch]);

  return { isLoading } 
}
