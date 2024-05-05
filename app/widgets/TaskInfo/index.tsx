import { TaskType } from "@/types/Task";
import { FC } from "react";
import styles from "./styles.module.css";
import { ResponseForm } from "../Forms/Response";
import { Link } from "@remix-run/react";
import { ResponsePreviewType } from "@/types/Response";

export const TaskInfo: FC<{
  data: TaskType;
  responsePrevs: ResponsePreviewType[];
}> = ({ data, responsePrevs }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__response}>
        <div className={styles.responses}>
          {responsePrevs.map((prev) => {
            return (
              <Link
                to={`/response/${prev.id}`}
                className={styles.responses__item}
                key={prev.id}
              >
                <p>{prev.title}</p>
                <p>{prev.created}</p>
              </Link>
            );
          })}
        </div>
        <ResponseForm />
      </div>
      <div className={styles.wrapper__task}>
        <p className={styles.task__title}>{data.title}</p>
        <p className={styles.task__description}>{data.description}</p>
      </div>
    </div>
  );
};
