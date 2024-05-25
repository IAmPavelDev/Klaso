import React, { useContext } from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import studentProfileIcon from "@/icons/student.svg";
import teacherProfileIcon from "@/icons/teacher.svg";
import guestProfileIcon from "@/icons/guest.svg";
import { useStore } from "@/zustand/store";
import { useAssideContext } from "../HideableAssideWrapper";

export const Header = ({
  setProfileState,
  profileState,
}: {
  setProfileState: React.Dispatch<React.SetStateAction<boolean>>;
  profileState: boolean;
}) => {
  const [
    userType,
    switchLeftAssideState,
    leftAssideState,
    isLeftAssideFoldable,
  ] = useStore((store) => [
    store.userType,
    store.switchLeftAssideState,
    store.leftAssideState,
    store.isLeftAssideFoldable,
  ]);

  const { isAssidePresent } = useAssideContext();

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__left}>
          {isAssidePresent && isLeftAssideFoldable && (
            <div className={styles.left__burger}>
              <button
                className={[
                  leftAssideState && styles.burger_active,
                  styles.burger,
                ].join(" ")}
                onClick={() => switchLeftAssideState()}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="20" fill="#404552" />
                  <path
                    d="M11 14H29M11 20H29M11 26H29"
                    stroke="#5294E2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          <Link to="/" className={styles.left__logo}>
            <span>klaso</span>
          </Link>
        </div>
        <div className={styles.wrapper__right}>
          <button onClick={() => setProfileState((prev) => !prev)}>
            <img
              className={[
                styles.right__profileIcon,
                profileState && styles.right__profileIcon_active,
              ].join(" ")}
              src={
                userType === "student"
                  ? studentProfileIcon
                  : userType === "teacher"
                  ? teacherProfileIcon
                  : guestProfileIcon
              }
              alt="user profile icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
