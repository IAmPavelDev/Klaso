import { StudentOmitPwd } from "@/types/Student";
import { FC } from "react";
import styles from "./styles.module.css";
import { Profile } from "@/components/Profile";
import { ResponseType } from "@/types/Response";
import { ResponseCard } from "@/components/ResponseCard";
import { HideableAssideWrapper } from "@/components/HideableAssideWrapper";

export const StudentProfile: FC<{
  data: StudentOmitPwd;
  works: ResponseType[];
}> = ({ data, works }) => {
  return (
    <div className={styles.wrapper}>
      <HideableAssideWrapper>
        <Profile className={styles.wrapper__profile} data={data} />
      </HideableAssideWrapper>
      <div className={styles.wrapper__works}>
        {works.map((work) => (
          <ResponseCard key={work.id} data={work} />
        ))}
      </div>
    </div>
  );
};
