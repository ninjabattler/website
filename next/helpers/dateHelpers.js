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
}

//Date format ex: 07, 23, 2022
export const formatSqlDate = (date) => {
  const splitDate = date.split(', ');
  const month = splitDate[0];
  const day = splitDate[1];
  const year = splitDate[2];

  return `${months[month]}, ${day}, ${year}`;
}