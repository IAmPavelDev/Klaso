import { FC } from "react";
import { ClassType } from "@/types/Class";
import { ClassCard } from "@/components/ClassCard";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { TeacherOmitPwd } from "@/types/Teacher";
import { TaskType } from "@/types/Task";

export const Classes: FC<{
  classesData: Array<ClassType>;
  teachersData: Array<TeacherOmitPwd>;
  firstTasks: Array<TaskType>;
}> = ({ classesData, teachersData, firstTasks }) => {
  console.log("hi");
  return (
    <div className={styles.wrapper}>
      {Array.from(classesData)
        .reverse()
        .map((classInfo: ClassType) => (
          <Link
            className={styles.wrapper__classLink}
            to={`/class/${classInfo.id}`}
            key={classInfo.id}
          >
            <ClassCard
              data={{
                classInfo,
                teacherInfo: teachersData.find((t: TeacherOmitPwd) =>
                  t.classes.some((classId: string) => classId === classInfo.id)
                ),
                firstTask: firstTasks.find(
                  (task: TaskType) => task.class === classInfo.id
                ),
              }}
            />
          </Link>
        ))}
    </div>
  );
};
