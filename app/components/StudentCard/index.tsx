import { GetStudents } from "@/helpers/GetStudentsById.client";
import { StudentOmitPwd } from "@/types/Student";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";

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
          <p className={styles.wrapper__name}>
            {[data.surname, data.name, data.fatherName].join(" ")}
          </p>
          <p className={styles.wrapper__major}>{data.major}</p>
        </div>
      )}
    </>
  );
};
