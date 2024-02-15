import { FC } from "react";
import styles from "./styles.module.css";
import { TextField, TextFieldProps } from "@mui/material";

export const Input: FC<TextFieldProps> = (inputProps) => {
  return (
    <TextField {...inputProps} variant="outlined" className={styles.wrapper} />
  );
};
