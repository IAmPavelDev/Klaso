import { Link } from "@remix-run/react";
import styles from "./styles.module.css";

export const ClassesHead = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/createClass" className={styles.wrapper__addBtn}>
        <p>Створити новий клас</p>
      </Link>
    </div>
  );
};
