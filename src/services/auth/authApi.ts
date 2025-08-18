import axios from "axios";
import { BASE_URL } from "../constants";


export const userSignIn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post(`${BASE_URL}/user/login/`, { email, password });
}

export const userSignUp = ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return axios.post(`${BASE_URL}/user/signup/`, { email, password, username });
}

type AccessTokenType = {
  access: string;
}

type RefreshTokenType = {
  refresh: string;
}

type UserTokenType = AccessTokenType & RefreshTokenType;

export const userGetToken = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserTokenType> => {
  return axios
    .post(`${BASE_URL}/user/token`, { email, password })
    .then((response) => {
      return response.data;
    })
}

export const userRefreshToken = (refresh: string): Promise<AccessTokenType> => {
  return axios
    .post(`${BASE_URL}/user/token/refresh`, { refresh })
    .then((response) => {
      return response.data
    })
}
