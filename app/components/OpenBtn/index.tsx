import { FC } from "react";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

export const OpenBtn: FC<
  RemixLinkProps & React.RefAttributes<HTMLAnchorElement>
> = ({ children, to, className, ...props }) => {
  return (
    <Link
      to={to}
      className={[className ?? "", styles.wrapper].join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
};
