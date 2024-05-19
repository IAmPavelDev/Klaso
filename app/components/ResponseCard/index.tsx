import { ResponseType } from "@/types/Response";
import { FC } from "react";
import styles from "./styles.module.css";
import { OpenBtn } from "../OpenBtn";
import { ShareBtn } from "../ShareBtn";

export const ResponseCard: FC<{ data: ResponseType }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p className={styles.head__title}>{data.title}</p>
        <p className={styles.head__grade}>{data.grade}/100</p>
      </div>
      <p className={styles.wrapper__description}>{data.description}</p>
      <div className={styles.wrapper__bottom}>
        <p className={styles.bottom__created}>{data.created}</p>
        <div>
          <ShareBtn />
          <OpenBtn type="link" to={`/response/${data.id}`}>
            Відкрити роботу
          </OpenBtn>
        </div>
      </div>
    </div>
  );
};
