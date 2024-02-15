import React from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import studentProfileIcon from "../../icons/student.svg";

export const Header = ({
  setProfileState,
  profileState,
}: {
  setProfileState: React.Dispatch<React.SetStateAction<boolean>>;
  profileState: boolean;
}) => {
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
          src={studentProfileIcon}
          alt="student profile icon"
        />
      </button>
    </header>
  );
};
