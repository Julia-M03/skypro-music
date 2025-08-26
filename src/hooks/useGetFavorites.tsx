import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/store";
import { tracksGetFavorites } from "@/services/tracks/tracksApi";
import { setFavoriteTracks } from "@/store/features/trackSlice";
import { useAppSelector } from "@/store/store";
import { withReauth } from "@/utils/withReauth";
import useInitAuth from "@/hooks/useInitAuth";


interface IHookResult {
    isLoadingFavorites: boolean
}

export default function useGetFavorites(): IHookResult {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

  useInitAuth();

  const [isLoadingFavorites, setIsLoadingFavorites] = useState(
    accessToken ? true : false
  );

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

  return { isLoadingFavorites }
}
