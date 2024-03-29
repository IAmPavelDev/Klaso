import { ClassType } from "@/types/Class";
import { FC } from "react";
import styles from "./styles.module.css";
import { TeacherOmitPwd } from "@/types/Teacher";
import { StudentCard } from "@/components/StudentCard";

export const ClassInfo: FC<{
  classInfo: ClassType;
  teacherInfo: TeacherOmitPwd;
}> = ({ classInfo, teacherInfo }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__info}>
        <p className={styles.info__title}>{classInfo.title}</p>
        <p className={styles.info__name}>
          {[teacherInfo.surname, teacherInfo.name, teacherInfo.fatherName].join(
            " "
          )}
        </p>
        <p className={styles.info__descr}>{classInfo.description.trim()}</p>

        <p className={styles.info__label}>Інші студенти в цьому класі:</p>
        <div className={styles.info__students}>
          {classInfo.students.map((student: string) => (
            <StudentCard id={student} />
          ))}
        </div>

        <div className={styles.info__studentsCtrl}></div>
      </div>
    </div>
  );
};
