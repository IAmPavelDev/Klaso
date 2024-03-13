import { FC } from "react";
import { ClassType } from "@/types/Class";
import { ClassCard } from "@/components/ClassCard";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { TeacherOmitPwd } from "@/types/Teacher";

export const Classes: FC<{
  classesData: Array<ClassType>;
  teachersData: Array<TeacherOmitPwd>;
}> = ({ classesData, teachersData }) => {
  return (
    <div className={styles.wrapper}>
      {classesData.map((classInfo: ClassType) => (
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
            }}
          />
        </Link>
      ))}
    </div>
  );
};
