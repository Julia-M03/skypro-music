import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/store";
import { useState } from "react";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { removeLike, addLike } from "@/services/tracks/tracksApi";
import { removeLikedTracks, addLikedTracks } from "@/store/features/trackSlice";
import { AxiosError } from "axios";
import { withReauth } from "@/utils/withReauth";


type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    console.log("accessToken", accessToken);
    if (!accessToken) {
      return setErrorMsg("Нет авторизации");
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || accessToken, track._id.toString()),
        refreshToken,
        dispatch
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message);
            } else if (error.request) {
              setErrorMsg("Произошла ошибка. Попробуйте позже");
            } else {
              setErrorMsg("Неизвестная ошибка");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};