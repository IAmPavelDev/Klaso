import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { FC, useEffect, useReducer, useState } from "react";
import { ClassType } from "@/types/Class";
import { StudentOmitPwd } from "@/types/Student";
import { StudentSearch } from "@/components/StudentSearch";
import { useForm } from "react-hook-form";
import { isStudentOmitPwd } from "@/helpers/typecheck";
import { GetStudents } from "@/helpers/GetStudentsById.client";
import { StudentCard } from "@/components/StudentCard";

type FormType = {
  title: string;
  description: string;
  major: string;
  students: string[];
};

type ActionType = {
  type: "title" | "description" | "major" | "student";
  payload: string;
};

export const ClassForm: FC<{ classInfo: ClassType | "new" }> = ({
  classInfo,
}) => {
  const [page, setPage] = useState(0);

  const defaultData =
    classInfo === "new"
      ? ({
          id: "new",
          title: "",
          description: "",
          created: "",
          major: "",
          tasks: [],
          teacher: "",
          students: [],
        } satisfies ClassType)
      : { ...classInfo };

  const formData = new FormData();

  const [selectedStudents, setSelectedStudents] = useState<StudentOmitPwd[]>(
    []
  );

  const { register, handleSubmit, getValues } = useForm<FormType>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setPage(1);
  });

  useEffect(() => {
    selectedStudents.length === 0 &&
      defaultData.students.length > 0 &&
      (async () => {
        const students = await GetStudents(defaultData.students);

        setSelectedStudents(students);
      })();
  }, []);

  return (
    <>
      <Link to="/" className={styles.mask} />
      <div className={styles.wrapper}>
        <p>Створити новий клас</p>
        {page === 0 && (
          <form onSubmit={onSubmit} className={styles.form}>
            <Input
              type="text"
              placeholder="Назва"
              className={styles.form__input}
              required
              {...register("title")}
            />
            <Input
              type="text"
              multiline
              minRows={3}
              placeholder="Опис"
              className={styles.form__input}
              required
              {...register("description")}
            />
            <Input
              type="text"
              placeholder="Спеціальність"
              className={styles.form__input}
              required
              {...register("major")}
            />
            <button type="submit" className={styles.form__submit}>
              Далі
            </button>
          </form>
        )}
        {page === 1 && (
          <div className={styles.wrapper__students}>
            <div className={styles.students__selected}>
              {selectedStudents.map((student: StudentOmitPwd) => (
                <StudentCard data={student} key={student.id} />
              ))}
            </div>
            <div className={styles.students__search}>
              <StudentSearch
                setStudent={(student: StudentOmitPwd) => {
                  register("students").onChange({
                    target: [student.id, ...getValues("students")],
                  });
                  setSelectedStudents((prev) => [...prev, student]);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
