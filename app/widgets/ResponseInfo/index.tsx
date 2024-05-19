import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ResponseType } from "@/types/Response";
import { StudentOmitPwd } from "@/types/Student";
import { StudentCard } from "@/components/StudentCard";
import { OpenBtn } from "@/components/OpenBtn";
import { ShareBtn } from "@/components/ShareBtn";
import { useStore } from "@/zustand/store";
import { Input } from "@/components/Input";
import { AnimatePresence, motion } from "framer-motion";
import { useFetcher, useSubmit } from "@remix-run/react";

export const ResponseInfo: FC<{
  data: ResponseType;
  studentInfo: StudentOmitPwd;
}> = ({ data, studentInfo }) => {
  const userType = useStore((state) => state.userType);
  const [gradeFormOpen, setGradeFormOpen] = useState<boolean>(false);
  const [currentGrade, setCurrentGrade] = useState<number>(data.grade);

  const gradeFetcher = useFetcher();

  useEffect(() => {
    const data = gradeFetcher.data;
    if (
      typeof data === "object" &&
      data !== null &&
      "status" in data &&
      data.status === "success"
    ) {
      setGradeFormOpen(false);
    } else {
      /* console.log("data: ", gradeFetcher.data); */
    }
  }, [gradeFetcher.data]);

  const SubmitGrade = (grade: number) => {
    const formData = new FormData();
    formData.set("intent", "grade");
    formData.set("grade", grade.toString());

    gradeFetcher.submit(formData, {
      action: `/response/${data.id}`,
      method: "POST",
      navigate: false,
    });
  };

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
            {userType === "teacher" && (
              <OpenBtn
                type={"button"}
                className={styles.links__task}
                onClick={() => setGradeFormOpen(true)}
              >
                Оцінити
              </OpenBtn>
            )}
            <OpenBtn
              className={styles.links__task}
              type={"link"}
              to={`/task/${data.task}`}
            >
              Відкрити завдання
            </OpenBtn>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {userType === "teacher" && gradeFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.wrapper__modal}
            >
              <div
                className={styles.mask}
                onClick={() => setGradeFormOpen(false)}
              />
              <div className={styles.gradeForm}>
                <Input
                  type="number"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value < 0) e.target.value = (0).toString();
                    if (value > 100) e.target.value = (100).toString();

                    setCurrentGrade(Number(e.target.value));
                  }}
                  defaultValue={data.grade}
                />
                <OpenBtn
                  type="button"
                  onClick={() => {
                    SubmitGrade(currentGrade);
                  }}
                >
                  Оцінити
                </OpenBtn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
