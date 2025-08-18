import axios from "axios";
import { BASE_URL } from "../constants";
import { SelectionType, TrackType } from "@/sharedTypes/sharedTypes";


export const getTrack = (): Promise<TrackType[]> => {
  return axios.get(`${BASE_URL}/catalog/track/all/`).then((response) => {
    return response.data.data;
  })
}

export const getTracksSelection = ({
  id,
}: {
  id: number;
}): Promise<SelectionType> => {
  return axios.get(`${BASE_URL}/catalog/selection/${id}/`).then((response) => {
    return response.data.data;
  })
}
