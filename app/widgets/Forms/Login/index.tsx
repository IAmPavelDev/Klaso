import { Form, FormProps, Link } from "@remix-run/react";
import { FC } from "react";
import { Input } from "@/components/Input";
import { Button } from "@mui/material";
import styles from "./styles.module.css";

export const LoginForm: FC<FormProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Вхід</h1>
        <Form {...props}>
          <Input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <div className={styles.actions}>
            <Link to="/reg">Реєстрація</Link>
            <Button type="submit" variant="outlined">
              Увійти
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
