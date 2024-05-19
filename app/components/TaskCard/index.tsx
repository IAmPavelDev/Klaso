import { FC } from "react";
import styles from "./styles.module.css";
import { TaskType } from "@/types/Task";
import { OpenBtn } from "../OpenBtn";

export const TaskCard: FC<{ data: TaskType }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p className={styles.head__title}>{data.title}</p>
        <p className={styles.head__created}>{data.created}</p>
      </div>
      <p className={styles.wrapper__description}>{data.description}</p>
      <div className={styles.wrapper__bottom}>
        <p className={styles.bottom__deadLine}>{data.deadLine}</p>
        <OpenBtn type="link" to={`/task/${data.id}`}>
          Відкрити завдання
        </OpenBtn>
      </div>
    </div>
  );
};
