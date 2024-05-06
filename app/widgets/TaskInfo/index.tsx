import { TaskType } from "@/types/Task";
import { FC, useState } from "react";
import styles from "./styles.module.css";
import { ResponseForm } from "../Forms/Response";
import { Link } from "@remix-run/react";
import { ResponsePreviewType } from "@/types/Response";
import { AnimatePresence, motion } from "framer-motion";

export const TaskInfo: FC<{
  data: TaskType;
  responsePrevs: ResponsePreviewType[];
}> = ({ data, responsePrevs }) => {
  const [state, setState] = useState<"responses" | "form">("form");
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__response}>
        <div className={styles.responses}>
          <div
            onClick={() =>
              setState((prev) => (prev === "form" ? "responses" : "form"))
            }
            className={styles.responses__open}
          >
            <p>{responsePrevs.length}</p>
            <p>ВАШІ РОБОТИ</p>
            <svg
              className={state === "form" ? "" : styles.rotate}
              width="17"
              height="11"
              viewBox="0 0 17 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.74032 9.30509L7.7404 9.30516C8.13137 9.69841 8.76941 9.69841 9.16038 9.30516L16.2065 2.21803C16.4057 2.0177 16.5 1.76048 16.5 1.50506C16.5 1.24881 16.4001 0.989796 16.2065 0.795033C15.8155 0.401785 15.1775 0.401785 14.7865 0.795033L8.45039 7.16803L2.21202 0.893341C1.82104 0.500093 1.183 0.500093 0.792031 0.893341C0.402681 1.28496 0.402657 1.92164 0.791956 2.31329C0.791981 2.31331 0.792006 2.31334 0.792031 2.31336L7.74032 9.30509Z"
                fill="#5294E2"
                stroke="#5294E2"
              />
            </svg>
          </div>
          <AnimatePresence mode="wait">
            {state === "responses" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {[...responsePrevs].reverse().map((prev) => {
                  return (
                    <Link
                      to={`/response/${prev.id}`}
                      className={styles.responses__item}
                      key={prev.id}
                    >
                      <p>{prev.title}</p>
                      <p>{prev.created}</p>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          animate={state === "form" ? { opacity: 1 } : { opacity: 0.7 }}
          style={
            state === "responses"
              ? {
                  userSelect: "none",
                  pointerEvents: "none",
                  cursor: "default",
                }
              : {}
          }
          transition={{ duration: 0.4 }}
        >
          <ResponseForm taskId={data.id} />
        </motion.div>
      </div>
      <div className={styles.wrapper__task}>
        <p className={styles.task__title}>{data.title}</p>
        <p className={styles.task__description}>{data.description}</p>
      </div>
    </div>
  );
};
