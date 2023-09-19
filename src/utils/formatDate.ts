import moment from "moment";

type DateFormat = "MMMM D, YYYY" | "D MMMM YYYY";

export const formatDate = (stringDate: string, format: DateFormat) => {
  const date = new Date(stringDate);
  const formattedDate = moment(date).format(format);
  return formattedDate;
};

export const parserDateTimeAgo = (stringDate: string) => {
  const date = new Date(stringDate);
  return moment(date).fromNow(true);
};
