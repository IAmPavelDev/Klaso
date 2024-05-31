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
        {taskInfo.id === "new" ? (
          <p>Створити нове завдання</p>
        ) : (
          <p>Редагувати завдання</p>
        )}
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
              defaultValue={taskInfo.title}
            />
            <Input
              type="text"
              multiline
              minRows={5}
              name="description"
              placeholder="Опис"
              className={styles.form__input}
              required
              defaultValue={taskInfo.description}
            />
            <input
              type="datetime-local"
              id="meeting-time"
              name="deadLine"
              required
              placeholder="Строк сдачі"
              className={[styles.form__input, styles.form__input_deadline].join(
                " "
              )}
            />
            <button
              name="intent"
              value={taskInfo.id === "new" ? "create" : "update"}
              className={styles.form__submit}
              type="submit"
            >
              {taskInfo.id === "new" ? (
                <p>Створити завдання</p>
              ) : (
                <p>Зберегти</p>
              )}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
