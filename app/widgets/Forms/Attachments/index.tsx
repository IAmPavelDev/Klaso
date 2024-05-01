import { useFetcher, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const AttachmentsForm = () => {
  const submit = useSubmit();
  return (
    <>
      <form>
        <label htmlFor="img-field">Image to upload</label>
        <input
          id="img-field"
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              submit(formData, {
                action: "/file/upload",
                method: "POST",
                navigate: false,
              });
            }
          }}
        />
        <button type="submit">Upload to S3</button>
      </form>
    </>
  );
};
