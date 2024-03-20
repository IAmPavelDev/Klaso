import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";
import { FC, useReducer, useState } from "react";
import { ClassType } from "@/types/Class";
import { StudentOmitPwd } from "@/types/Student";
import { StudentSearch } from "@/components/StudentSearch";

type ActionType = {
  type: "title" | "description" | "major" | "student";
  payload: string;
};

const FormReducer = (state: ClassType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "major":
    case "description":
    case "title":
      return { ...state, [type]: payload };
    case "student":
      return { ...state, students: [...state.students, payload] };
    default:
      return state;
  }
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

  const [state, dispatch] = useReducer(FormReducer, defaultData);

  const [selectedStudents, setSelectedStudents] = useState<StudentOmitPwd[]>(
    []
  );

  const formData = new FormData();

  return (
    <>
      <Link to="/" className={styles.mask} />
      <div className={styles.wrapper}>
        <p>Створити новий клас</p>
        <div className={styles.form}>
          <Input
            type="text"
            placeholder="Назва"
            name="title"
            className={styles.form__input}
            required
            defaultValue={state.title}
          />
          <Input
            type="text"
            name="description"
            multiline
            minRows={3}
            placeholder="Опис"
            className={styles.form__input}
            required
            defaultValue={state.description}
          />
          <Input
            type="text"
            placeholder="Спеціальність"
            name="major"
            className={styles.form__input}
            required
            defaultValue={state.major}
          />
          <StudentSearch setStudent={(student: StudentOmitPwd) => {}} />
          {selectedStudents.map((student: StudentOmitPwd) => (
            <p>{student.name}</p>
          ))}
        </div>
        <button type="submit" className={styles.form__submit}>
          Створити
        </button>
      </div>
    </>
  );
};
