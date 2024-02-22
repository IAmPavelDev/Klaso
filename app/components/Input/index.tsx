import { FC } from "react";
import styles from "./styles.module.css";
import { TextField, TextFieldProps } from "@mui/material";

export const Input: FC<TextFieldProps & { className?: string }> = (
  inputProps
) => {
  return (
    <TextField
      {...inputProps}
      variant="outlined"
      className={[inputProps.className, styles.wrapper].join(" ")}
    />
  );
};
