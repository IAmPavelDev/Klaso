import { Input } from "@/components/Input";
import { TaskType } from "@/types/Task";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import styles from "./styles.module.css";

export const TaskForm: FC<{ taskInfo: TaskType }> = ({ taskInfo }) => {
  return (
    <>
      <Link to={`/class/${taskInfo.class}`} className={styles.mask} />
      <div className={styles.container}>
        <p>Створити нове завдання</p>
        <div className={styles.wrapper}>
          <Form
            className={styles.form}
            action={`/class/${taskInfo.class}/taskCtrl/${taskInfo.id}`}
            method="POST"
          >
            <Input
              type="text"
              name="title"
              placeholder="Назва"
              className={styles.form__input}
              required
            />
            <Input
              type="text"
              multiline
              minRows={5}
              name="description"
              placeholder="Опис"
              className={styles.form__input}
              required
            />
            <Input
              type="text"
              name="deadLine"
              placeholder="Строк сдачі"
              className={styles.form__input}
              required
            />
            <button className={styles.form__submit} type="submit">
              Створити завдання
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
