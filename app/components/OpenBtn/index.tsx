import { FC } from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

type OpenLinkProps = {
  type: "link";
} & RemixLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

type OpenBtnProps = {
  type: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const OpenBtn: FC<OpenBtnProps | OpenLinkProps> = ({
  children,
  className,
  type,
  ...props
}) => {
  return (
    <>
      {type === "link" && (
        <Link
          className={[className ?? "", styles.wrapper].join(" ")}
          {...(props as OpenLinkProps)}
        >
          {children}
        </Link>
      )}
      {type === "button" && (
        <button
          className={[className ?? "", styles.wrapper].join(" ")}
          {...(props as OpenBtnProps)}
        >
          {children}
        </button>
      )}
    </>
  );
};
