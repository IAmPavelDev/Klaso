import React from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import studentProfileIcon from "@/icons/student.svg";
import teacherProfileIcon from "@/icons/teacher.svg";
import guestProfileIcon from "@/icons/guest.svg";
import { useStore } from "@/zustand/store";

export const Header = ({
  setProfileState,
  profileState,
}: {
  setProfileState: React.Dispatch<React.SetStateAction<boolean>>;
  profileState: boolean;
}) => {
  const userType = useStore((store) => store.userType);

  return (
    <header className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        <span>klaso</span>
      </Link>
      <button onClick={() => setProfileState((prev) => !prev)}>
        <img
          className={[
            styles.profileIcon,
            profileState && styles.profileIconActive,
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
    </header>
  );
};
