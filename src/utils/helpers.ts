import { TrackType } from "../sharedTypes/sharedTypes";


export function dateFormat(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", options);
  return formattedDate;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType
): string[] {

  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }
    else if (typeof value === "string") {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time & 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  
  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
}
