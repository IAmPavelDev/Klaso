import { StudentOmitPwd } from "@/types/Student";
import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { StudentCard } from "@/components/StudentCard";

export const StudentSearch: FC<{
  setStudent: (student: StudentOmitPwd) => void;
}> = ({ setStudent }) => {
  const [feed, setFeed] = useState<StudentOmitPwd[]>([]);

  const [searchStr, setSearchStr] = useState<string>("");

  useEffect(() => {
    fetch("/student?q=" + searchStr, { method: "GET" })
      .then((data) => data.json())
      .then((res) => {
        setFeed(res.students);
      });
  }, [searchStr]);

  return (
    <div className={styles.wrapper}>
      <p>Додати студентів: </p>
      <Input
        type="search"
        placeholder="Пошук студентів"
        value={searchStr}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchStr(e.target.value)
        }
        className={styles.form__input}
      />
      {feed.map((s: StudentOmitPwd) => (
        <StudentCard data={s} key={s.id} />
      ))}
    </div>
  );
};
