import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type InitialStateType = {
  userName: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: InitialStateType = {
  userName: "",
  accessToken: "",
  refreshToken: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      localStorage.setItem("userName", action.payload)
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload)
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload)
    },
    clearUser: (state) => {
      localStorage.removeItem("userName")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      state.userName = ""
      state.accessToken = ""
      state.refreshToken = ""
    },
  },
})

export const { setUserName, setAccessToken, setRefreshToken, clearUser  } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;