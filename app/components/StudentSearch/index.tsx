import { StudentOmitPwd } from "@/types/Student";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { StudentCard } from "@/components/StudentCard";

export const StudentSearch: FC<{
  selectedStudents: StudentOmitPwd[];
  setStudent: (student: StudentOmitPwd) => void;
}> = ({ setStudent, selectedStudents }) => {
  const [feed, setFeed] = useState<StudentOmitPwd[]>([]);

  const [searchStr, setSearchStr] = useState<string>("");

  const filterFeed = useCallback(
    (f: StudentOmitPwd[]) => {
      const filtered = f.filter(
        (s: StudentOmitPwd) =>
          !selectedStudents.some((selected) => selected.id === s.id)
      );

      setFeed(filtered);
    },
    [selectedStudents]
  );

  useEffect(() => {
    fetch("/student?q=" + searchStr, { method: "GET" })
      .then((data) => data.json())
      .then((res) => {
        filterFeed(res.students);
      });
  }, [searchStr]);

  useEffect(() => {
    filterFeed(feed);
  }, [selectedStudents]);

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
      <div className={styles.wrapper__feed}>
        {feed.map((s: StudentOmitPwd) => (
          <div className={styles.feed__student} key={s.id}>
            <div
              role="button"
              className={styles.student__add}
              onClick={() => setStudent(s)}
            >
              +
            </div>
            <StudentCard data={s} />
          </div>
        ))}
      </div>
    </div>
  );
};
