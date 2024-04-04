import { ClassType } from "@/types/Class";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TeacherOmitPwd } from "@/types/Teacher";
import { StudentCard } from "@/components/StudentCard";
import { Link } from "@remix-run/react";
import { StudentOmitPwd } from "@/types/Student";
import { GetStudents } from "@/helpers/GetStudentsById.client";

export const ClassInfo: FC<{
  classInfo: ClassType;
  teacherInfo: TeacherOmitPwd;
}> = ({ classInfo, teacherInfo }) => {
  const [students, setStudents] = useState<StudentOmitPwd[]>([]);

  useEffect(() => {
    GetStudents(classInfo.students).then((data) => setStudents(data));
  }, [classInfo.students]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__info}>
        <p className={styles.info__title}>{classInfo.title}</p>
        <p className={styles.info__name}>
          {[teacherInfo.surname, teacherInfo.name, teacherInfo.fatherName].join(
            " "
          )}
        </p>
        <p className={styles.info__descr}>{classInfo.description.trim()}</p>

        <p className={styles.info__label}>Інші студенти в цьому класі:</p>
        <div className={styles.info__students}>
          {students.map((student: StudentOmitPwd) => (
            <div key={student.id}>
              <StudentCard data={student} />
            </div>
          ))}
        </div>

        <div className={styles.info__studentsCtrl}></div>
      </div>
      <div className={styles.wrapper__tasks}>
        <div className={styles.tasks__create}>
          <Link
            className={styles.create__addBtn}
            to={`/class/${classInfo.id}/taskCtrl/new`}
          >
            <p>Створити завдання</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
