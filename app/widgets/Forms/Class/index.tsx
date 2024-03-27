import { Link, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { FC, useEffect, useRef, useState } from "react";
import { ClassType } from "@/types/Class";
import { StudentOmitPwd } from "@/types/Student";
import { StudentSearch } from "@/components/StudentSearch";
import { useForm } from "react-hook-form";
import { GetStudents } from "@/helpers/GetStudentsById.client";
import { StudentCard } from "@/components/StudentCard";

type FormType = {
  title: string;
  description: string;
  major: string;
  students: string[];
};

export const ClassForm: FC<{ classInfo: ClassType | "new" }> = ({
  classInfo,
}) => {
  const [page, setPage] = useState(0);

  const submit = useSubmit();

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

  const [selectedStudents, setSelectedStudents] = useState<StudentOmitPwd[]>(
    []
  );

  const formData = useRef<FormType>({} as FormType);

  const { register, handleSubmit } = useForm<Omit<FormType, "students">>();

  const onSubmit = handleSubmit((data) => {
    setPage(1);
    formData.current = { ...formData.current, ...data };
  });

  useEffect(() => {
    selectedStudents.length === 0 &&
      defaultData.students.length > 0 &&
      (async () => {
        const students = await GetStudents(defaultData.students);
        setSelectedStudents(students);
      })();
  }, []);

  const SubmitForm = () => {
    const fD = new FormData();

    formData.current["students"] = selectedStudents.map((s) => s.id);

    fD.append("data", JSON.stringify(formData.current));

    submit(fD, {
      action: "/classCtrl/" + defaultData.id,
      method: "POST",
    });
  };

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
          <>
            <div className={styles.wrapper__students}>
              <div className={styles.students__selected}>
                {selectedStudents.map((student: StudentOmitPwd) => (
                  <StudentCard data={student} key={student.id} />
                ))}
              </div>
              <div className={styles.students__search}>
                <StudentSearch
                  selectedStudents={selectedStudents}
                  setStudent={(student: StudentOmitPwd) => {
                    setSelectedStudents((prev) => [...prev, student]);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={SubmitForm}
              className={styles.form__submit}
            >
              створити
            </button>
          </>
        )}
      </div>
    </>
  );
};
