import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.css";
import { useStore } from "@/zustand/store";

const HideableAssideContext = createContext<{
  isAssidePresent: boolean;
  setAssidePresent: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAssidePresent: false,
  setAssidePresent: () => {},
});

export const HideableAssideProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAssidePresent, setAssidePresent] = useState(false);

  return (
    <HideableAssideContext.Provider
      value={{ isAssidePresent, setAssidePresent }}
    >
      {children}
    </HideableAssideContext.Provider>
  );
};

export const useAssideContext = () => useContext(HideableAssideContext);

export const HideableAssideWrapper: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [setIsShow, isShow, isLeftAssideFoldable] = useStore((state) => [
    state.setLeftAssideState,
    state.leftAssideState,
    state.isLeftAssideFoldable,
  ]);

  const { setAssidePresent } = useContext(HideableAssideContext);

  useEffect(() => {
    setAssidePresent(true);
    return () => setAssidePresent(false);
  }, [setAssidePresent]);

  if (!isLeftAssideFoldable) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={styles.wrapper}
      animate={{ x: isShow ? "0%" : "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isShow && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            style={{ height: "100%" }}
          >
            <div className={styles.mask} onClick={() => setIsShow(false)} />
            <div className={[styles.asside, className ?? ""].join(" ")}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
