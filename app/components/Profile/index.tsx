import { FC, ReactElement } from "react";
import { StudentOmitPwd } from "@/types/Student";
import styles from "./styles.module.css";
import studentProfileIcon from "@/icons/student.svg";
import { TeacherOmitPwd } from "@/types/Teacher";
import { isStudentOmitPwd } from "@/helpers/typecheck";

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  data: StudentOmitPwd | TeacherOmitPwd;
}

export const Profile: FC<ProfileProps> = ({ data, className, ...props }) => {
  return (
    <div className={[className, styles.wrapper].join(" ")} {...props}>
      <img
        className={styles.profileIcon}
        src={studentProfileIcon}
        alt="student profile icon"
      />
      <p
        className={styles.name}
      >{`${data.surname} ${data.name} ${data.fatherName}`}</p>
      {isStudentOmitPwd(data) && <p className={styles.major}>{data.major}</p>}
      <p className={styles.years}>{data.about}</p>
    </div>
  );
};
