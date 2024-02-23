import { FC } from "react";
import { ClassType } from "@/types/Class";
import { ClassCard } from "@/components/ClassCard";
import styles from "./styles.module.css";

export const Classes: FC<{ classesData: Array<ClassType> }> = ({
  classesData,
}) => {
  return (
    <div className={styles.wrapper}>
      {classesData.map((classInfo: ClassType) => (
        <ClassCard data={classInfo} key={classInfo.id} />
      ))}
    </div>
  );
};
