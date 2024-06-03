import { Input } from "@/components/Input";
import styles from "./styles.module.css";
import { ChangeEvent, FC, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Attachment } from "@/components/Attachment";
import { useFetcher } from "@remix-run/react";
import { useStore } from "@/zustand/store";
import { ResponseType } from "@/types/Response";

type ResponseForm = {
  title: string;
  description: string;
  attachments: File[];
};

const FILE_SIZE_LIMIT_IN_BYTES = 26214400;

export const ResponseForm: FC<{
  type: "create" | "edit";
  taskId: string;
  defaultData?: ResponseType;
}> = ({ taskId, defaultData, type }) => {
  const fileId = useId();

  const defaultInfo =
    defaultData ??
    ({
      id: "new",
      title: "",
      description: "",
      attachments: [],
      task: "",
      student: "",
      created: "",
      grade: 0,
    } satisfies ResponseType);

  const studentId = useStore((store) => store.state.id);

  const { register, handleSubmit, getValues, reset } =
    useForm<Omit<ResponseForm, "attachments">>();

  const [attachments, setAttachments] = useState<ResponseForm["attachments"]>(
    []
  );

  const SubmitFiles = useFetcher();

  const SubmitFormData = useFetcher();

  /* useEffect(() => { */
  /*   console.log("files", SubmitFiles.data); */
  /*   const formInfo = new FormData(); */
  /**/
  /*   const values = getValues(); */
  /**/
  /*   formInfo.append("title", values.title); */
  /*   formInfo.append("description", values.description); */
  /*   formInfo.append("attachments", JSON.stringify([])); */
  /*   formInfo.append("task", taskId); */
  /*   formInfo.append("student", studentId); */
  /**/
  /*   SubmitFormData.submit(formInfo, { */
  /*     method: "POST", */
  /*     action: "/response/new", */
  /*     navigate: false, */
  /*     encType: "multipart/form-data", */
  /*   }); */
  /* }, [SubmitFiles.data]); */

  /* console.log(SubmitToServer.data); */

  useEffect(() => {
    if (
      typeof SubmitFormData.data === "object" &&
      SubmitFormData.data !== null &&
      "status" in SubmitFormData.data &&
      SubmitFormData.data.status === "success"
    ) {
      reset();
      setAttachments([]);
    }
  }, [SubmitFormData.data]);

  const pushFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const files = Array.from(e.target.files)
      .filter((file) => file.size <= FILE_SIZE_LIMIT_IN_BYTES)
      .filter((file) => !attachments.some((f) => f.name === file.name));

    if (files.length > 0) setAttachments((prev) => [...prev, ...files]);
  };

  const submit = (data: Omit<ResponseForm, "attachments">) => {
    /* const formdata = new FormData(); */

    /* for (const [key, value] of Object.entries(data)) { */
    /*   formdata.append(key, value); */
    /* } */

    /* attachments.forEach((file) => formdata.append(file.name, file)); */
    /**/
    /* SubmitFiles.submit(formdata, { */
    /*   method: "POST", */
    /*   action: "/file/upload", */
    /*   navigate: false, */
    /*   encType: "multipart/form-data", */
    /* }); */

    const formInfo = new FormData();

    const values = getValues();

    formInfo.append("title", values.title);
    formInfo.append("description", values.description);
    formInfo.append("attachments", JSON.stringify([]));
    formInfo.append("task", taskId);
    formInfo.append("student", studentId);

    formInfo.set("intent", type);

    SubmitFormData.submit(formInfo, {
      method: "POST",
      action: `/response/${defaultInfo.id}`,
      navigate: true,
      encType: "multipart/form-data",
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(submit)}>
      <div className={styles.wrapper__head}>
        <p>
          {type === "create" && <>ЗДАТИ </>}
          {type === "edit" && <>ОНОВИТИ </>}
          РОБОТУ
        </p>
      </div>
      <div className={styles.wrapper__inputs}>
        <Input
          {...register("title")}
          type="text"
          name="title"
          placeholder="Назва"
          inputProps={{ maxLength: 100, minLength: 5 }}
          multiline
          required
          defaultValue={defaultInfo.title}
        />
        <Input
          {...register("description")}
          type="text"
          name="description"
          placeholder="Опис"
          inputProps={{ maxLength: 5000, minLength: 5 }}
          multiline
          minRows={3}
          required
          defaultValue={defaultInfo.description}
        />
      </div>
      <div className={styles.wrapper__attachments}>
        {attachments.map((data: File) => {
          return (
            <Attachment
              viewtype={"removable"}
              data={data}
              key={data.name}
              onRemoveClick={() => {
                setAttachments((prev) =>
                  prev.filter((file) => file.name !== data.name)
                );
              }}
            />
          );
        })}
      </div>
      <div className={styles.wrapper__buttons}>
        {/* <button type="button" className={styles.buttons__upload}> */}
        {/*   <label htmlFor={fileId}> */}
        {/*     <svg */}
        {/*       width="29" */}
        {/*       height="28" */}
        {/*       viewBox="0 0 29 28" */}
        {/*       fill="none" */}
        {/*       xmlns="http://www.w3.org/2000/svg" */}
        {/*     > */}
        {/*       <path */}
        {/*         d="M14.2353 2.38991C14.9835 1.63487 15.8735 1.03506 16.8542 0.62493C17.8349 0.214802 18.8869 0.00243408 19.9499 2.08018e-05C21.0129 -0.00239248 22.0658 0.205196 23.0484 0.610867C24.0309 1.01654 24.9236 1.6123 25.6753 2.36394C26.4269 3.11558 27.0227 4.0083 27.4283 4.99083C27.834 5.97336 28.0416 7.02634 28.0392 8.08932C28.0368 9.1523 27.8244 10.2043 27.4143 11.185C27.0041 12.1657 26.4043 13.0557 25.6493 13.8039L12.8593 26.5939C11.9371 27.4851 10.7016 27.9783 9.4192 27.9673C8.13677 27.9563 6.91 27.4419 6.00322 26.535C5.09644 25.6281 4.58223 24.4012 4.57139 23.1188C4.56056 21.8364 5.05396 20.601 5.94529 19.6789L17.3053 8.31891C17.4939 8.13675 17.7465 8.03596 18.0087 8.03824C18.2709 8.04052 18.5217 8.14569 18.7071 8.33109C18.8925 8.5165 18.9977 8.76732 19 9.02951C19.0022 9.29171 18.9014 9.54431 18.7193 9.73291L7.35929 21.0929C6.83783 21.6389 6.55073 22.3672 6.55939 23.1222C6.56806 23.8771 6.87181 24.5987 7.40566 25.1325C7.93952 25.6664 8.66109 25.9701 9.41603 25.9788C10.171 25.9875 10.8993 25.7004 11.4453 25.1789L24.2353 12.3889C24.8052 11.8265 25.2582 11.1569 25.5682 10.4188C25.8783 9.68056 26.0392 8.88834 26.0419 8.08768C26.0445 7.28703 25.8887 6.49376 25.5835 5.75356C25.2783 5.01336 24.8297 4.34084 24.2635 3.77472C23.6973 3.2086 23.0247 2.76007 22.2845 2.45494C21.5442 2.14982 20.751 1.99413 19.9503 1.99685C19.1497 1.99956 18.3574 2.16062 17.6193 2.47076C16.8811 2.78089 16.2116 3.23397 15.6493 3.80391L1.71929 17.7339C1.62704 17.8294 1.5167 17.9056 1.39469 17.958C1.27269 18.0104 1.14147 18.038 1.00869 18.0392C0.87591 18.0403 0.744231 18.015 0.621334 17.9647C0.498438 17.9145 0.386786 17.8402 0.292893 17.7463C0.199001 17.6524 0.124747 17.5408 0.0744666 17.4179C0.0241857 17.295 -0.00111606 17.1633 3.77567e-05 17.0305C0.00119157 16.8977 0.0287779 16.7665 0.0811869 16.6445C0.133596 16.5225 0.209778 16.4122 0.305288 16.3199L14.2353 2.38991Z" */}
        {/*         fill="#5294E2" */}
        {/*       /> */}
        {/*     </svg> */}
        {/*     додати файл */}
        {/*   </label> */}
        {/*   <input type="file" id={fileId} multiple onChange={pushFile} /> */}
        {/* </button> */}
        <button type="submit" className={styles.buttons__send}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.0754419 1.96378C-0.331558 0.698777 0.985442 -0.431223 2.17444 0.162777L27.1684 12.6578C28.2744 13.2108 28.2744 14.7878 27.1684 15.3418L2.17444 27.8368C0.986442 28.4308 -0.331558 27.3008 0.0754419 26.0358L3.94744 13.9998L0.0754419 1.96378ZM5.72544 14.9998L2.34444 25.5158L25.3814 13.9998L2.34344 2.48378L5.72744 12.9988H16.9974C17.2627 12.9988 17.517 13.1041 17.7045 13.2917C17.8921 13.4792 17.9974 13.7336 17.9974 13.9988C17.9974 14.264 17.8921 14.5183 17.7045 14.7059C17.517 14.8934 17.2627 14.9988 16.9974 14.9988L5.72544 14.9998Z"
              fill="#5294E2"
            />
          </svg>
          {type === "create" && <p>здати роботу</p>}
          {type === "edit" && <p>зберегти</p>}
        </button>
      </div>
    </form>
  );
};
