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

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time & 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType
): string[] {
  // Используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  // Проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    // Если значение — массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }
    // Если значение — строка
    else if (typeof value === "string") {
      uniqueValues.add(value);
    }
  });

  // Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
}