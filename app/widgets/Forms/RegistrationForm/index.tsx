import { Form, FormProps, Link } from "@remix-run/react";
import { FC, useState } from "react";
import { Input } from "@/components/Input";
import styles from "./styles.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const RegistrationForm: FC<FormProps> = (props) => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Регістрація</h1>
        <Form {...props}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="userType"
            onChange={(_, value: string) => {
              if (value === "student" || value === "teacher")
                setUserType(value);
            }}
            defaultValue={userType}
          >
            <FormControlLabel
              value="teacher"
              control={<Radio />}
              label="teacher"
              style={{ width: 100 }}
            />
            <FormControlLabel
              style={{ width: 100 }}
              value="student"
              control={<Radio />}
              label="student"
            />
          </RadioGroup>
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
          {userType === "student" && (
            <>
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
            </>
          )}
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
