import { Input } from "@/components/Input";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";

/* id: string; */
/* title: string; */
/* description: string; */
/* attachments: string[]; */
/* task: string; */
/* student: string; */
/* created: Date; */
/* grade: string; */

export const ResponseForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p>ЗДАТИ РОБОТУ</p>
      </div>
      <div className={styles.wrapper__inputs}>
        <Input type="text" name="title" inputProps={{ maxLength: 100 }} />
        <Input type="text" name="description" inputProps={{ maxLength: 500 }} />
      </div>
      <div className={styles.wrapper__attachments}></div>
      <div className={styles.wrapper__buttons}>
        <Button variant="outlined">додати файл</Button>
        <Button variant="outlined">здати роботу</Button>
      </div>
    </div>
  );
};
