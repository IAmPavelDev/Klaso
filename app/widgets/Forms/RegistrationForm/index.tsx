import { Form, FormProps, Link } from "@remix-run/react";
import { FC } from "react";
import { Input } from "@/components/Input";
import styles from "./styles.module.css";
import { Button } from "@mui/material";

export const RegistrationForm: FC<FormProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Регістрація</h1>
        <Form {...props}>
          <Input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            required
          />
          <Input type="text" name="surname" placeholder="Прізвище" required />
          <Input type="text" name="name" placeholder="Ім'я" required />
          <Input
            type="text"
            name="fatherName"
            placeholder="По-батькові"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <Input
            type="text"
            name="major"
            placeholder="Спеціальність"
            required
          />
          <Input
            type="text"
            name="courseStart"
            placeholder="Рік початку навчання"
            required
          />
          <Input
            type="text"
            name="courseEnd"
            placeholder="Рік кінця навчання"
            required
          />
          <div className={styles.actions}>
            <Link to="/login">Увійти</Link>
            <Button type="submit" variant="outlined">
              Зареєструватися
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
