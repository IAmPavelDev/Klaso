import moment from "moment";
import "moment/locale/uk.js";

export const formatDate = (date: string, format: string = "LL") => {
  const momentDate = moment(date);
  momentDate.locale("uk");

  return momentDate.isValid() ? momentDate.format(format) : "";
};
