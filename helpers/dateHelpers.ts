const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

//Date format ex: 2022-07-23
export const formatSanityDate = (date: string): string => {
  const splitDate: string[] = date.split("-");
  const year: string = splitDate[0];
  const month: Month = splitDate[1] as Month;
  const day: string = splitDate[2];

  return `${months[month] || "January"}, ${day}, ${year}`;
};
