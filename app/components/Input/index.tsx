import { FC, forwardRef, useState } from "react";
import styles from "./styles.module.css";
import { TextField, TextFieldProps } from "@mui/material";

export const Input: FC<TextFieldProps & { className?: string }> = forwardRef<
  any,
  TextFieldProps & { className?: string }
>((inputProps, ref) => {
  const [placeholder, setPlaceholder] = useState<string>(
    inputProps?.placeholder ?? ""
  );
  return (
    <TextField
      ref={ref}
      {...inputProps}
      placeholder={placeholder}
      variant="outlined"
      className={[inputProps.className, styles.wrapper].join(" ")}
      onFocus={() => setPlaceholder("")}
      onBlur={() => setPlaceholder(inputProps?.placeholder ?? "")}
    />
  );
});
