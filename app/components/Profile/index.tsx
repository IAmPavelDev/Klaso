import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import studentProfileIcon from "../../icons/student.svg";
import editBtn from "../../icons/edit.svg";
import { AnimatePresence, motion } from "framer-motion";

export const Profile = ({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const assideRef = useRef<HTMLDivElement>(null!);

  /*
  const [assideX, setAssideX] = useState(0);

  useEffect(() => {
    const asside = assideRef.current;
    let isClicked: boolean = false;
    let drugStartPoint: number;

    const clickHandler = (event: MouseEvent) => {
      isClicked = true;
      drugStartPoint = event.clientX;
      console.log("click");
    };

    const upHandler = () => {
      isClicked = false;
    };

    const moveHandler = (event: MouseEvent) => {
      if (isClicked) {
        setAssideX((prev) => prev + event.movementX);
        console.log(event.movementX);
      }
    };

    if (asside) {
      asside.addEventListener("mousedown", clickHandler);
      asside.addEventListener("mouseup", upHandler);
      asside.addEventListener("mouseleave", upHandler);
      asside.addEventListener("mousemove", moveHandler);
    }

    return () => {
      if (asside) {
        asside.removeEventListener("mousedown", clickHandler);
        asside.removeEventListener("mouseup", upHandler);
        asside.removeEventListener("mouseleave", upHandler);
        asside.removeEventListener("mousemove", moveHandler);
      }
    };
  }, []);

  */

  return (
    <motion.div ref={assideRef}>
      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.mask}
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className={styles.profileAsside}
            >
              <button className={styles.editBtn}>
                <img alt="edit btn" src={editBtn} />
              </button>
              <img
                className={styles.profileIcon}
                src={studentProfileIcon}
                alt="student profile icon"
              />
              <p className={styles.name}>Ткаченко Павло Дмитрович</p>
              <p className={styles.major}>
                Автоматизація та компьютерно-інтегровані технології
              </p>
              <p className={styles.years}>Роки навчання: 2020 - 2024</p>
              <p>Студент 4-го курсу</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
