import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { FC, useEffect, useReducer, useState } from "react";
import { ClassType } from "@/types/Class";
import { StudentOmitPwd } from "@/types/Student";
import { StudentSearch } from "@/components/StudentSearch";
import { useForm } from "react-hook-form";
import { isStudentOmitPwd } from "@/helpers/typecheck";

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

  console.log(register("students").onChange({ target: ["test"] }));

  const onSubmit = handleSubmit((data) => console.log(data));

  useEffect(() => {
    const GetStudents = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const opts = {
        method: "POST",
        headers,
        body: JSON.stringify({ studentsIds: defaultData.students }),
      };
      const students: unknown = await fetch("/student", opts).then((res) =>
        res.json()
      );
      if (Array.isArray(students) && students.every(isStudentOmitPwd))
        setSelectedStudents(students);
    };
    selectedStudents.length === 0 && GetStudents();
  }, []);

  return (
    <>
      <Link to="/" className={styles.mask} />
      <div className={styles.wrapper}>
        <p>Створити новий клас</p>
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
        </form>
        <StudentSearch
          setStudent={(student: StudentOmitPwd) => {
            register("students").onChange({
              target: [student.id, ...getValues("students")],
            });
            setSelectedStudents((prev) => [...prev, student]);
          }}
        />
        {/* {selectedStudents.map((student: StudentOmitPwd) => ( */}
        {/*   <p>{student.name}</p> */}
        {/* ))} */}
        <button type="submit" className={styles.form__submit}>
          Створити
        </button>
      </div>
    </>
  );
};
