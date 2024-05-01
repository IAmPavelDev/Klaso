import { ClassType } from "@/types/Class";
import { FC } from "react";
import styles from "./styles.module.css";
import { TeacherOmitPwd } from "@/types/Teacher";
import { TaskCard } from "../TaskCard";
import { TaskType } from "@/types/Task";

export const ClassCard: FC<{
  data: {
    classInfo: ClassType;
    teacherInfo: TeacherOmitPwd | undefined;
    firstTask: TaskType | undefined;
  };
}> = ({ data: { classInfo, teacherInfo, firstTask } }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p className={styles.head__title}>{classInfo.title}</p>
        {teacherInfo && (
          <p className={styles.head__teacher}>{`${
            teacherInfo.surname
          } ${teacherInfo.name.slice(0, 1)}. ${teacherInfo.fatherName.slice(
            0,
            1
          )}.`}</p>
        )}
      </div>
      <div className={styles.wrapper__tasks}>
        {firstTask ? (
          <div className={styles.tasks__task}>
            <p className={styles.task__title}>{firstTask.title}</p>
            <p className={styles.task__descr}>{firstTask.description}</p>
          </div>
        ) : (
          <div className={styles.tasks__placeholder}>
            Створіть перше завдання
          </div>
        )}
      </div>
      <div className={styles.wrapper__footer}>
        <p className={styles.footer__date}>
          Створено <span>{classInfo.created}</span>
        </p>
      </div>
    </div>
  );
};
