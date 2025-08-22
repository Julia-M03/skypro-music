import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { authSliceReducer } from "./features/authSlice";
import { trackSliceReducer } from "./features/trackSlice";

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