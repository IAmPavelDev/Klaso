import { ClassType } from "@/types/Class";
import { LoaderFunctionArgs } from "@remix-run/node";
import { FC } from "react";
import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {};

export const ClassCard: FC<{ data: ClassType }> = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p className={styles.head__title}>{data.title}</p>
      </div>
      <div className={styles.wrapper__tasks}>
        {(() => {
          const task = data.tasks[0];
          if (!task) return <div>Створіть перше завдання</div>;
          return <div className={styles.tasks__title}></div>;
        })()}
      </div>
      <div className={styles.wrapper__footer}>
        <p className={styles.footer__date}>
          Створено <span>{data.created}</span>
        </p>
      </div>
    </div>
  );
};
