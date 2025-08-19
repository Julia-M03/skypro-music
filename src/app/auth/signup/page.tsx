"use client";

import React from "react";
import styles from "./signup.module.css";
import classNames from "classnames";
import { useForm, SubmitHandler } from "react-hook-form";
import { userSignUp, userGetToken } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { setUserName, setAccessToken, setRefreshToken } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";

type Inputs = {
  login: string;
  password: string;
  checkPassword: string;
};

export default function SignUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    setIsLoading(true);
    setErrorMessage(null);
    userSignUp({
      email: watch("login"),
      password: watch("password"),
      username: watch("login"),
    })
      .then((res) => {
        if (res.status.toString().startsWith("2")) {
          dispatch(setUserName(res.data.username));
          userGetToken({
            email: watch("login"),
            password: watch("password"),
          }).then((token) => {
            console.log("Токен получен:", token);
            dispatch(setAccessToken(token.access));
            dispatch(setRefreshToken(token.refresh));
          });
          router.push("/music/main");
        }
        if (res.status.toString().startsWith("4")) {
          alert("Неверный логин или пароль");
        }
        if (res.status.toString().startsWith("5")) {
          alert("Ошибка сервера. Пожалуйста, попробуйте позже.");
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error("Ошибка:", error);
            setErrorMessage(error.response?.data?.message);
          }
          if (error.request) {
            console.error("Ошибка запроса:", error.request);
            setErrorMessage(
              "Отсутствует ответ от сервера. Пожалуйста, проверьте подключение к интернету."
            );
          } else {
            console.error("Ошибка настройки:", error.message);
            setErrorMessage("Произошла неизвестная ошибка, попробуйте позже.");
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <form className={styles.modal__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      <div className={styles.modal__inputContainer}>
        <input
          className={classNames(styles.modal__input, styles.login)}
          type="text"
          placeholder="Почта"
          {...register("login", {
            required: "Введите почту",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Неверный формат почты",
            },
          })}
        />
        <div className={classNames(styles.errorContainer, styles.login)}>
          {errors.login?.message}
        </div>
      </div>
      <div className={styles.modal__inputContainer}>
        <input
          className={styles.modal__input}
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 6,
              message: "Минимум 6 символов",
            },
          })}
        />
        <div className={styles.errorContainer}>{errors.password?.message}</div>
      </div>
      <div className={styles.modal__inputContainer}>
        <input
          className={styles.modal__input}
          type="password"
          placeholder="Повторите пароль"
          {...register("checkPassword", {
            required: "Повторите пароль",
            validate: (value) =>
              value === watch("password") || "Пароли не совпадают",
          })}
        />
        <div className={styles.errorContainer}>
          {errors.checkPassword?.message}
        </div>
      </div>
      {errorMessage && (
        <div className={styles.errorContainer}>{errorMessage}</div>
      )}
      <button className={styles.modal__btnSignupEnt} disabled={isLoading}>Зарегистрироваться</button>
    </form>
  )
}
