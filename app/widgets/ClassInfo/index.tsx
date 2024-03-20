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
      <p className={styles.wrapper__title}>{classInfo.title}</p>
      <p className={styles.wrapper__name}>
        {[teacherInfo.surname, teacherInfo.name, teacherInfo.fatherName].join(
          " "
        )}
      </p>
      <p className={styles.wrapper__descr}>{classInfo.description.trim()}</p>

      <p className={styles.wrapper__label}>Інші студенти в цьому класі:</p>

      {classInfo.students.map((student: string) => (
        <StudentCard id={student} />
      ))}

      <div className={styles.wrapper__studentsCtrl}></div>
    </div>
  );
};
