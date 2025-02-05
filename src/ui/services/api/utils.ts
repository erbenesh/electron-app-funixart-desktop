import { HEADERS } from "../DiscoverService";

export const fetchDataViaGet = async (
    url: string,
    API_V2: string | boolean = false
) => {
    if (API_V2) {
      HEADERS["API-Version"] = "v2";
    }
    try {
      const response = await fetch(url, {
        headers: HEADERS,
      });
      if (response.status !== 200) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
};

// export const fetchDataViaPost = async (
//     url: string,
//     body: string,
//     API_V2: string | boolean = false,
//     contentType: string = ""
//   ) => {
//     // if (API_V2) {
//     //   HEADERS["API-Version"] = "v2";
//     // }
//     if (contentType != "") {
//       HEADERS["Content-Type"] = contentType;
//     }
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: HEADERS,
//         body: body,
//       });
//       if (response.status !== 200) {
//         return null;
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//LOCAL STORAGE

export function setJWT(user_id: number | string, jwt: string) {
    const data = { jwt: jwt, user_id: user_id };

    localStorage.setItem("JWT", JSON.stringify(data));
}
export function getJWT() {
    const data = localStorage.getItem("JWT");

    return JSON.parse(data!);
}
export function removeJWT() {
    localStorage.removeItem("JWT");
}

//OTHER

export function numberDeclension(
    number: number,
    one: string,
    two: string,
    five: string
) {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return five;
    const last_num = number % 10;
    if (last_num == 1) return one;
    if ([2, 3, 4].includes(last_num)) return two;
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return five;
}

const months = [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июня",
    "июля",
    "авг.",
    "сен.",
    "окт.",
    "ноя.",
    "дек.",
];

export function unixToDate(
    unix: number,
    type: "full" | "dayMonth" | "dayMonthYear"
    ) {
    const date = new Date(unix * 1000);
    if (type === "full")
        return (
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear() +
        ", " +
        date.getHours() +
        ":" +
        String(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
        );
    if (type === "dayMonth")
        return date.getDate() + " " + months[date.getMonth()];
    if (type === "dayMonthYear")
        return (
        date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
        );
    }

    export const getSeasonFromUnix = (unix: number) => {
    const date = new Date(unix * 1000);
    const month = date.getMonth();
    if (month >= 3 && month <= 5) return "весна";
    if (month >= 6 && month <= 8) return "лето";
    if (month >= 9 && month <= 11) return "осень";
    return "зима";
    };

    export function sinceUnixDate(unixInSeconds: number) {
    const unix = Math.floor(unixInSeconds * 1000);
    const date = new Date(unix);
    const currentDate = new Date().valueOf();
    const dateDifferenceSeconds = new Date(currentDate - unix).getTime() / 1000;

    const minutes = Math.floor(dateDifferenceSeconds / 60);
    const hours = Math.floor(dateDifferenceSeconds / 3600);
    const days = Math.floor(dateDifferenceSeconds / 86400);

    const minutesName = numberDeclension(minutes, "минута", "минуты", "минут");
    const hoursName = numberDeclension(hours, "час", "часа", "часов");
    const daysName = numberDeclension(days, "день", "дня", "дней");

    if (dateDifferenceSeconds < 60) return "менее минуты назад";
    if (dateDifferenceSeconds < 3600) return `${minutes} ${minutesName} назад`;
    if (dateDifferenceSeconds < 86400) return `${hours} ${hoursName} назад`;
    if (dateDifferenceSeconds < 2592000) return `${days} ${daysName} назад`;

    return (
        date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    );
}

export function minutesToTime(
    min: number,
    type?: "full" | "daysOnly" | "daysHours"
    ) {
    const d = Math.floor(min / 1440); // 60*24
    const h = Math.floor((min - d * 1440) / 60);
    const m = Math.round(min % 60);

    const dDisplay =
        d > 0 ? `${d} ${numberDeclension(d, "день", "дня", "дней")}` : "";
    const hDisplay =
        h > 0 ? `${h} ${numberDeclension(h, "час", "часа", "часов")}` : "";
    const mDisplay =
        m > 0 ? `${m} ${numberDeclension(m, "минута", "минуты", "минут")}` : "";

    if (type == "daysOnly") {
        if (d > 0) return dDisplay;
        return "? дней";
    } else if (type == "daysHours") {
        if (d > 0 && h > 0) return dDisplay + ", " + hDisplay;
        if (h > 0) return hDisplay;
        if (m > 0) return mDisplay;
    } else {
        return `${d > 0 ? dDisplay : ""}${h > 0 ? ", " + hDisplay : ""}${m > 0 ? ", " + mDisplay : ""}`;
    }
}

export const BookmarksList = {
    watching: 1,
    planned: 2,
    watched: 3,
    delayed: 4,
    abandoned: 5,
};
  
export const SortList = {
    adding_descending: 1,
    adding_ascending: 2,
    year_descending: 3,
    year_ascending: 4,
    alphabet_descending: 5,
    alphabet_ascending: 6,
};
  