import { ClassType } from "@/types/Class";
import { FC } from "react";
import styles from "./styles.module.css";
import { TeacherOmitPwd } from "@/types/Teacher";

export const ClassCard: FC<{
  data: { classInfo: ClassType; teacherInfo: TeacherOmitPwd | undefined };
}> = ({ data: { classInfo, teacherInfo } }) => {
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
        {(() => {
          const task = classInfo.tasks[0];
          if (!task)
            return (
              <div className={styles.tasks__placeholder}>
                Створіть перше завдання
              </div>
            );
          return <div className={styles.tasks__title}></div>;
        })()}
      </div>
      <div className={styles.wrapper__footer}>
        <p className={styles.footer__date}>
          Створено <span>{classInfo.created}</span>
        </p>
      </div>
    </div>
  );
};
