import { Form, Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { Input } from "@/components/Input";

export const ClassForm = () => {
  return (
    <>
      <Link to="/" className={styles.mask} />
      <div className={styles.wrapper}>
        <p>Створити новий клас</p>
        <Form method="POST" action="/createClass">
          <Input
            type="text"
            placeholder="Назва"
            name="title"
            className={styles.form__input}
            required
          />
          <Input
            type="text"
            name="description"
            multiline
            minRows={3}
            placeholder="Опис"
            className={styles.form__input}
            required
          />
          <Input
            type="text"
            placeholder="Спеціальність"
            name="major"
            className={styles.form__input}
            required
          />
          <button type="submit" className={styles.form__submit}>
            Створити
          </button>
        </Form>
      </div>
    </>
  );
};
