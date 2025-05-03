// export const fetchDataViaGet = async (
//     url: string,
//     API_V2: string | boolean = false
// ) => {
//     if (API_V2) {
//       HEADERS["API-Version"] = "v2";
//     }
//     try {
//       const response = await fetch(url, {
//         headers: HEADERS,
//       });
//       if (response.status !== 200) {
//         return null;
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
// };

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

//DATE functions

export function numberDeclension(number: number, one: string, two: string, five: string) {
  if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return five;
  const last_num = number % 10;
  if (last_num == 1) return one;
  if ([2, 3, 4].includes(last_num)) return two;
  if ([5, 6, 7, 8, 9, 0].includes(last_num)) return five;
}

const months = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'мая',
  'июня',
  'июля',
  'авг.',
  'сен.',
  'окт.',
  'ноя.',
  'дек.',
];

export function unixToDate(unix: number, type: 'full' | 'dayMonth' | 'dayMonthYear') {
  const date = new Date(unix * 1000);
  if (type === 'full')
    return (
      date.getDate() +
      ' ' +
      months[date.getMonth()] +
      ' ' +
      date.getFullYear() +
      ', ' +
      date.getHours() +
      ':' +
      String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    );
  if (type === 'dayMonth') return date.getDate() + ' ' + months[date.getMonth()];
  if (type === 'dayMonthYear')
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

export const getSeasonFromUnix = (unix: number) => {
  const date = new Date(unix * 1000);
  const month = date.getMonth();
  if (month >= 3 && month <= 5) return 'весна';
  if (month >= 6 && month <= 8) return 'лето';
  if (month >= 9 && month <= 11) return 'осень';
  return 'зима';
};

export function sinceUnixDate(unixInSeconds: number) {
  const unix = Math.floor(unixInSeconds * 1000);
  const date = new Date(unix);
  const currentDate = new Date().valueOf();
  const dateDifferenceSeconds = new Date(currentDate - unix).getTime() / 1000;

  const minutes = Math.floor(dateDifferenceSeconds / 60);
  const hours = Math.floor(dateDifferenceSeconds / 3600);
  const days = Math.floor(dateDifferenceSeconds / 86400);

  const minutesName = numberDeclension(minutes, 'минута', 'минуты', 'минут');
  const hoursName = numberDeclension(hours, 'час', 'часа', 'часов');
  const daysName = numberDeclension(days, 'день', 'дня', 'дней');

  if (dateDifferenceSeconds < 60) return 'менее минуты назад';
  if (dateDifferenceSeconds < 3600) return `${minutes} ${minutesName} назад`;
  if (dateDifferenceSeconds < 86400) return `${hours} ${hoursName} назад`;
  if (dateDifferenceSeconds < 2592000) return `${days} ${daysName} назад`;

  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

export function minutesToTime(min: number, type?: 'full' | 'daysOnly' | 'daysHours') {
  const d = Math.floor(min / 1440); // 60*24
  const h = Math.floor((min - d * 1440) / 60);
  const m = Math.round(min % 60);

  const dDisplay = d > 0 ? `${d} ${numberDeclension(d, 'день', 'дня', 'дней')}` : '';
  const hDisplay = h > 0 ? `${h} ${numberDeclension(h, 'час', 'часа', 'часов')}` : '';
  const mDisplay = m > 0 ? `${m} ${numberDeclension(m, 'минута', 'минуты', 'минут')}` : '';

  if (type == 'daysOnly') {
    if (d > 0) return dDisplay;
    return '? дней';
  } else if (type == 'daysHours') {
    if (d > 0 && h > 0) return dDisplay + ', ' + hDisplay;
    if (h > 0) return hDisplay;
    if (m > 0) return mDisplay;
  } else {
    return `${d > 0 ? dDisplay : ''}${h > 0 ? ', ' + hDisplay : ''}${m > 0 ? ', ' + mDisplay : ''}`;
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

/**
 * Преобразует timestamp в читаемый формат даты/времени
 * @param {number} timestamp - timestamp в секундах или миллисекундах
 * @param {boolean} [showFullDate=false] - показывать ли полную дату для старых постов
 * @returns {string} - форматированная строка с датой
 */
export function formatPostTimestamp(timestamp, showFullDate = false) {
  // Проверяем, нужно ли умножать на 1000 (для timestamp в секундах)
  const ts = timestamp < 1e12 ? timestamp * 1000 : timestamp;
  const postDate: any = new Date(ts);
  const now: any = new Date();

  // Разница в миллисекундах
  const diff = now - postDate;
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Форматирование времени (добавляем ведущий ноль)
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Форматирование даты
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Сегодня
  if (postDate.toDateString() === now.toDateString()) {
    if (diffInMinutes < 1) return 'только что';
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${pluralize(diffInMinutes, ['минуту', 'минуты', 'минут'])} назад`;
    return `${diffInHours} ${pluralize(diffInHours, ['час', 'часа', 'часов'])} назад`;
  }

  // Вчера
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (postDate.toDateString() === yesterday.toDateString()) {
    return `вчера в ${formatTime(postDate)}`;
  }

  // На этой неделе (но не сегодня/вчера)
  const diffInDaysThisWeek = diffInDays < 7;
  if (diffInDaysThisWeek && !showFullDate) {
    const days = [
      'воскресенье',
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
    ];
    return `${days[postDate.getDay()]} в ${formatTime(postDate)}`;
  }

  // Более недели назад - показываем полную дату
  return `${formatDate(postDate)} в ${formatTime(postDate)}`;
}

// Вспомогательная функция для склонения слов
function pluralize(number, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
}
