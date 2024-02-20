import { FC } from "react";
import { StudentOmitPwd } from "@/types/Student";
import styles from "./styles.module.css";
import studentProfileIcon from "@/icons/student.svg";

export const StudentProfile: FC<{ data: StudentOmitPwd }> = ({ data }) => {
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
      <p className={styles.major}>{data.major}</p>
      <p className={styles.years}>
        Роки навчання: {data.courseStart} - {data.courseEnd}
      </p>
      <p>
        Студент {new Date().getFullYear() - Number(data.courseStart)}-го курсу
      </p>
    </>
  );
};
