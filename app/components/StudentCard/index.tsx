import { GetStudents } from "@/helpers/GetStudentsById.client";
import { StudentOmitPwd } from "@/types/Student";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import studentProfileIcon from "@/icons/student.svg";

export const StudentCard: FC<{ id: string } | { data: StudentOmitPwd }> = (
  props
) => {
  const [data, setData] = useState<StudentOmitPwd>();

  "data" in props && !data && setData(props.data);

  useEffect(() => {
    "id" in props &&
      (async () => {
        const studentData = (await GetStudents([props.id]))[0];

        setData(studentData);
      })();
  }, []);

  return (
    <>
      {data && (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__icon}>
            <svg
              width="22"
              height="21"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.7789 2.97586L8.97856 0.51591C8.91159 0.494697 8.83914 0.494697 8.77217 0.51591L0.971822 2.97586C0.907248 2.99631 0.851095 3.03544 0.811294 3.08772C0.771492 3.13999 0.750052 3.20278 0.75 3.26721V9.41707C0.75 9.49862 0.784243 9.57683 0.845195 9.6345C0.906147 9.69217 0.988815 9.72456 1.07501 9.72456C1.16121 9.72456 1.24388 9.69217 1.30483 9.6345C1.36579 9.57683 1.40003 9.49862 1.40003 9.41707V3.69385L4.96544 4.81851C4.52522 5.37792 4.22483 6.0245 4.08685 6.70959C3.94887 7.39469 3.9769 8.10048 4.16884 8.77385C4.36077 9.44722 4.71161 10.0706 5.19496 10.5972C5.67831 11.1238 6.28159 11.5398 6.9594 11.814C5.26445 12.2552 3.79051 13.2846 2.7529 14.7851C2.70993 14.8534 2.69654 14.9347 2.71554 15.0121C2.73455 15.0895 2.78447 15.1569 2.85485 15.2002C2.92523 15.2436 3.01061 15.2594 3.09309 15.2445C3.17557 15.2296 3.24875 15.1851 3.2973 15.1203C4.58274 13.2546 6.61651 12.1845 8.87537 12.1845C11.1342 12.1845 13.168 13.2546 14.4534 15.1195C14.502 15.1843 14.5752 15.2289 14.6576 15.2438C14.7401 15.2587 14.8255 15.2428 14.8959 15.1995C14.9663 15.1561 15.0162 15.0887 15.0352 15.0113C15.0542 14.9339 15.0408 14.8526 14.9978 14.7844C13.9643 13.2838 12.4863 12.2545 10.7913 11.8132C11.4691 11.539 12.0724 11.123 12.5558 10.5964C13.0391 10.0699 13.39 9.44645 13.5819 8.77308C13.7738 8.09971 13.8019 7.39392 13.6639 6.70883C13.5259 6.02373 13.2255 5.37715 12.7853 4.81774L16.7789 3.55779C16.8433 3.53721 16.8993 3.49803 16.939 3.44577C16.9787 3.3935 17 3.33078 17 3.26644C17 3.20209 16.9787 3.13937 16.939 3.08711C16.8993 3.03484 16.8433 2.99566 16.7789 2.97509V2.97586ZM13.1006 7.57211C13.1006 8.21355 12.9375 8.84557 12.6249 9.4148C12.3124 9.98404 11.8597 10.4738 11.3051 10.8426C10.7504 11.2115 10.11 11.4486 9.43809 11.5341C8.76614 11.6195 8.08233 11.5507 7.44441 11.3334C6.80649 11.1162 6.23319 10.7569 5.77294 10.2859C5.31268 9.81495 4.97898 9.24609 4.80002 8.6274C4.62106 8.00871 4.6021 7.35837 4.74474 6.73129C4.88737 6.1042 5.18742 5.51881 5.61953 5.02453L8.77217 6.0185C8.83909 6.04 8.91164 6.04 8.97856 6.0185L12.1312 5.02453C12.7586 5.74069 13.1015 6.64192 13.1006 7.57211ZM8.87537 5.40275L2.10287 3.26721L8.87537 1.13167L15.6479 3.26721L8.87537 5.40275Z"
                fill="#5294E2"
              />
            </svg>
          </div>
          <div className={styles.wrapper__content}>
            <p className={styles.content__name}>
              {[data.surname, data.name, data.fatherName].join(" ")}
            </p>
            <p className={styles.content__major}>{data.major}</p>
          </div>
        </div>
      )}
    </>
  );
};
