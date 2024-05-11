import { FC } from "react";
import styles from "./styles.module.css";
import { ResponseType } from "@/types/Response";
import { StudentOmitPwd } from "@/types/Student";
import { StudentCard } from "@/components/StudentCard";
import { OpenBtn } from "@/components/OpenBtn";
import { ShareBtn } from "@/components/ShareBtn";

export const ResponseInfo: FC<{
  data: ResponseType;
  studentInfo: StudentOmitPwd;
}> = ({ data, studentInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__head}>
          <p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.6656C4.31875 14.6656 1.33438 11.6813 1.33438 8C1.33438 4.31875 4.31875 1.33438 8 1.33438C11.6813 1.33438 14.6656 4.31875 14.6656 8C14.6656 11.6813 11.6813 14.6656 8 14.6656ZM8.66562 2.66563H7.33125V8L10.3313 11L11.3313 10L8.66562 7.33437V2.66563Z"
                fill="#5294E2"
              />
            </svg>
            {data.created}
          </p>
          <p>{data.grade}/100</p>
        </div>
        <div className={styles.wrapper__content}>
          <p className={styles.content__title}>{data.title}</p>
          <p className={styles.content__description}>{data.description}</p>
        </div>
        {data.attachments.length > 0 && (
          <div className={styles.wrapper__attachments}></div>
        )}
        <div className={styles.wrapper__bottom}>
          <StudentCard data={studentInfo} />
          <div className={styles.bottom__links}>
            <ShareBtn />
            <OpenBtn className={styles.links__task} to={`/task/${data.task}`}>
              Відкрити завдання
            </OpenBtn>
          </div>
        </div>
      </div>
    </div>
  );
};
