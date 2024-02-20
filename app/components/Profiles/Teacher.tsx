import { FC } from "react";
import styles from "./styles.module.css";
import studentProfileIcon from "@/icons/student.svg";
import { TeacherOmitPwd } from "@/types/Teacher";

export const TeacherProfile: FC<{ data: TeacherOmitPwd }> = ({ data }) => {
  return (
    <>
      <img
        className={styles.profileIcon}
        src={studentProfileIcon}
        alt="student profile icon"
      />
      <p
        className={styles.name}
      >{`${data.surname} ${data.name} ${data.fatherName}`}</p>
    </>
  );
};
