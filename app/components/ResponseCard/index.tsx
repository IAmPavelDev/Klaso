import { ResponseType } from "@/types/Response";
import { FC } from "react";
import styles from "./styles.module.css";

export const ResponseCard: FC<{ data: ResponseType }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.wrapper__title}>{data.title}</p>
    </div>
  );
};

/*
 title: string;
 description: string;
 student: string;
 created: string;
 grade: number;
*/
