import dayjs from "dayjs";
export const FormatTime = (date: Date | string) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

export const localGetItem = (key: string): any => {
  let data_str = localStorage.getItem(key);
  if (data_str) {
    return JSON.parse(data_str);
  }
  return null;
};

export const localSetItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const generateUUID = (): number => {
  return Math.floor(Math.random() * 939874);
};
