import { TaskType } from "@/types/Task";
import { FC } from "react";
import styles from "./styles.module.css";

export const TaskInfo: FC<{ data: TaskType }> = ({ data }) => {
  return <div className={styles.wrapper}>{data.title}</div>;
};
