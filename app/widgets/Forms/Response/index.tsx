import { Input } from "@/components/Input";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Attachment } from "@/components/Attachment";

/* id: string; */
/* title: string; */
/* description: string; */
/* attachments: string[]; */
/* task: string; */
/* student: string; */
/* created: Date; */
/* grade: string; */

type ResponseForm = {
  title: string;
  description: string;
  attachments: File[];
};

export const ResponseForm = () => {
  const fileId = useId();

  const { register, watch, handleSubmit } = useForm<ResponseForm>();

  console.log(watch("attachments")?.[0]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__head}>
        <p>ЗДАТИ РОБОТУ</p>
      </div>
      <div className={styles.wrapper__inputs}>
        <Input
          {...register("title")}
          type="text"
          name="title"
          placeholder="Назва"
          inputProps={{ maxLength: 100 }}
          multiline
        />
        <Input
          {...register("description")}
          type="text"
          name="description"
          placeholder="Опис"
          inputProps={{ maxLength: 500 }}
          multiline
          minRows={3}
        />
      </div>
      <div className={styles.wrapper__attachments}>
        {watch("attachments")?.length &&
          Object.values(watch("attachments")).map((data: File) => {
            return (
              <Attachment viewtype={"removable"} data={data} key={data.name} />
            );
          })}
      </div>
      <div className={styles.wrapper__buttons}>
        <Button variant="outlined" className={styles.buttons__upload}>
          <label htmlFor={fileId}>додати файл</label>
          <input
            size={26214400}
            type="file"
            id={fileId}
            {...register("attachments")}
          />
        </Button>
        <Button variant="outlined">здати роботу</Button>
      </div>
    </div>
  );
};
