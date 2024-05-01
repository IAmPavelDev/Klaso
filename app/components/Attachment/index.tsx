import { FC } from "react";

export const Attachment: FC<{
  viewtype: "removable" | "regular";
  data: File;
}> = ({ viewtype, data }) => {
  console.log(data);
  return <div>{data.name}</div>;
};
