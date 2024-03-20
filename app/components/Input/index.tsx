import { FC, useState } from "react";
import styles from "./styles.module.css";
import { TextField, TextFieldProps } from "@mui/material";

export const Input: FC<TextFieldProps & { className?: string }> = (
  inputProps
) => {
  const [placeholder, setPlaceholder] = useState<string>(
    inputProps?.placeholder ?? ""
  );
  return (
    <TextField
      {...inputProps}
      placeholder={placeholder}
      variant="outlined"
      className={[inputProps.className, styles.wrapper].join(" ")}
      onFocus={() => setPlaceholder("")}
      onBlur={() => setPlaceholder(inputProps?.placeholder ?? "")}
    />
  );
};
