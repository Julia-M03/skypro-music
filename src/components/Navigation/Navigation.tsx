"use client"

import Link from "next/link";
import Image from 'next/image';
import styles from "./navigation.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { clearUser } from "@/store/features/authSlice";


export default function Navigation() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { accessToken } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearUser());
    // if (!accessToken) {
    //   router.push("/auth/signin");
    // } else {
    //  router.push("/music");
    // }
  };

  const switchMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={switchMenu}>
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
        <span className={styles.burger__line} />
      </div>
      <div className={styles.nav__menu}>
        {isOpen && (
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            {accessToken && (
              <li className={styles.menu__item}>
                <Link href="/music/favorite" className={styles.menu__link}>
                  Мой плейлист
                </Link>
              </li>
            )}
            <li className={styles.menu__item}>
              {accessToken
                ? (
                  <div onClick={handleLogout} className={styles.menu__link}>
                    Выйти
                  </div>
                )
                : (
                  <Link href="/auth/signin" className={styles.menu__link}>
                    Войти
                  </Link>
                )
              }
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
