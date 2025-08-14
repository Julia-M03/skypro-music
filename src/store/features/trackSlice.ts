import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "../../sharedTypes/sharedTypes";

type TrackState = {
  tracks: TrackType[];
  currentTrack: {
    track: TrackType | null;
    isPlaying: boolean;
  };
  currentTrackList: TrackType[];
  playList: TrackType[];
  shuffledPlayList: TrackType[];
  isShuffle: boolean;
};

const initialState: TrackState = {
  tracks: [],
  currentTrack: {
    track: null,
    isPlaying: false,
  },
  currentTrackList: [],
  playList: [],
  shuffledPlayList: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks(state, action: PayloadAction<TrackType[]>) {
      state.tracks = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack.track = action.payload;
      state.currentTrack.isPlaying = true;
    },
    setCurrentTrackList(state, action: PayloadAction<TrackType[]>) {
      state.currentTrackList = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playList = action.payload;
      state.shuffledPlayList = [...state.playList].sort(
        () => Math.random() - 0.5,
      );
    },

    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      state.currentTrack.isPlaying =
        action.payload === undefined
          ? !state.currentTrack.isPlaying
          : action.payload;
    },
    stopPlayback(state) {
      if (state.currentTrack.track) {
        state.currentTrack.isPlaying = false;
      }
    },
    setNextTrack(state) {
      const playList = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;
      const currentIndex = playList.findIndex(
        (track) => track._id === state.currentTrack?.track?._id
      );
      let nextIndex = currentIndex + 1;

      if (!playList[nextIndex]) {
        if (state.isShuffle)
          nextIndex = 0;
        else
          state.currentTrack.isPlaying = false;
      }
      state.currentTrack.track = playList[nextIndex]
        ? playList[nextIndex]
        : state.currentTrack.track;
    },
    setPrevTrack(state) {
      const playList = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;
      const currentIndex = playList.findIndex(
        (track) => track._id === state.currentTrack?.track?._id
      );
      const nextIndex = currentIndex - 1;
      state.currentTrack.track = playList[nextIndex]
        ? playList[nextIndex]
        : state.currentTrack.track;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});

export const { setTracks, setCurrentTrack, togglePlay, stopPlayback, setCurrentPlaylist, setNextTrack, setPrevTrack, toggleShuffle, setCurrentTrackList, } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;