import { TaskType } from "@/types/Task";
import { FC } from "react";
import styles from "./styles.module.css";
import { ResponseForm } from "../Forms/Response";

export const TaskInfo: FC<{ data: TaskType }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <ResponseForm />
    </div>
  );
};
