import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import editBtn from "@/icons/edit.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/zustand/store";
import { Form, Link, useLocation } from "@remix-run/react";
import { Button } from "@mui/material";
import { StudentProfile } from "./Student";
import { isStudentOmitPwd, isTeacherOmitPwd } from "@/helpers/typecheck";
import { TeacherProfile } from "./Teacher";

export const Profile = ({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const assideRef = useRef<HTMLDivElement>(null!);

  const [isUserLoaded, userData, userType] = useStore((state) => [
    state.isUserLoaded,
    state.state,
    state.userType,
  ]);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
              {isUserLoaded ? (
                <>
                  <div className={styles.head}>
                    <Form method="POST" action="/logout">
                      <Button
                        type="submit"
                        variant="outlined"
                        className={styles.head__logout}
                      >
                        Вийти
                      </Button>
                    </Form>
                    <button className={styles.head__editBtn}>
                      <img alt="edit btn" src={editBtn} />
                    </button>
                  </div>
                  {userType === "student" && isStudentOmitPwd(userData) && (
                    <StudentProfile data={userData} />
                  )}
                  {userType === "teacher" && isTeacherOmitPwd(userData) && (
                    <TeacherProfile data={userData} />
                  )}
                </>
              ) : (
                <div className={styles.login}>
                  <Link to="/login" className={styles.login__link}>
                    Увійти до облікового запису
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
