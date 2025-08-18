import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { trackSliceReducer } from "@/store/features/trackSlice";
import { authSliceReducer } from "./features/authSlice";

export const store = configureStore({
  reducer: combineReducers({
    tracks: trackSliceReducer,
    auth: authSliceReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;