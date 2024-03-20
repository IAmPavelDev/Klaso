import { StudentOmitPwd } from "@/types/Student";
import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";

export const StudentSearch: FC<{
  setStudent: (student: StudentOmitPwd) => void;
}> = ({ setStudent }) => {
  const [feed, setFeed] = useState<StudentOmitPwd[]>([]);

  const [searchStr, setSearchStr] = useState<string>("");

  useEffect(() => {
    fetch("/studentQuery?q=" + searchStr, { method: "GET" })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setFeed(res.students);
      });
  }, [searchStr]);

  console.log(feed, searchStr);

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
        <div className={styles.student}>
          <div className={styles.student__name}>
            {[s.surname, s.name, s.fatherName].join(" ")}
          </div>
        </div>
      ))}
    </div>
  );
};
