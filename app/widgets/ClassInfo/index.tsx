import { ClassType } from "@/types/Class";
import { FC } from "react";
import styles from "./styles.module.css";
import { TeacherOmitPwd } from "@/types/Teacher";
import { StudentCard } from "@/components/StudentCard";
import { Link, useSubmit } from "@remix-run/react";
import { StudentOmitPwd } from "@/types/Student";
import { TaskType } from "@/types/Task";
import { TaskCard } from "@/components/TaskCard";
import { EditBtn } from "@/components/EditBtn";
import { useStore } from "@/zustand/store";
import { DeleteBtn } from "@/components/DeleteBtn";

export const ClassInfo: FC<{
  classInfo: ClassType;
  teacherInfo: TeacherOmitPwd;
  studentsInfo: StudentOmitPwd[];
  tasksInfo: TaskType[];
}> = ({ classInfo, teacherInfo, studentsInfo, tasksInfo }) => {
  const userType = useStore((state) => state.userType);
  const submit = useSubmit();

  const Delete = () => {
    const formData = new FormData();
    formData.set("intent", "delete");
    submit(formData, {
      method: "POST",
      navigate: false,
      action: `/classCtrl/${classInfo.id}`,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__info}>
        {userType === "teacher" && (
          <div className={styles.info__ctrl}>
            <EditBtn type="link" to={`/classCtrl/${classInfo.id}`} />
            <DeleteBtn onClick={Delete} />
          </div>
        )}
        <p className={styles.info__title}>{classInfo.title}</p>
        <p className={styles.info__name}>
          {[teacherInfo.surname, teacherInfo.name, teacherInfo.fatherName].join(
            " "
          )}
        </p>
        <p className={styles.info__descr}>{classInfo.description.trim()}</p>

        <p className={styles.info__label}>Студенти в цьому класі:</p>
        <div className={styles.info__students}>
          {studentsInfo.map((student: StudentOmitPwd) => (
            <div key={student.id}>
              <StudentCard data={student} />
            </div>
          ))}
        </div>

        <div className={styles.info__studentsCtrl}></div>
      </div>
      <div className={styles.wrapper__tasks}>
        {userType === "teacher" && (
          <div className={styles.tasks__create}>
            <Link
              className={styles.create__addBtn}
              to={`/class/${classInfo.id}/taskCtrl/new`}
            >
              <p>Створити завдання</p>
            </Link>
          </div>
        )}
        <div className={styles.tasks__list}>
          {[...tasksInfo].reverse().map((task: TaskType) => (
            <TaskCard data={task} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
