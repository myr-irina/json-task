import moment from 'moment';
import { response } from './data.js';

// Задание 1. Сформировать массив уникальных дат
const uniqueDates = [
  ...new Set(response.map((obj) => obj.start.split(' ')[0])),
];
console.log(uniqueDates); //[ '25.01.2023', '01.02.2023' ]

// Задание 2. Подсчитать количество ошибок для каждой даты
function calculateErrors(response, uniqueDates) {
  return uniqueDates.map((date) => {
    return response.reduce((cum, curr) => {
      if (curr.start.split(' ')[0] === date) {
        cum += curr.exam.filter((exam) => exam.examInfoCheck === 0).length;
      }
      return cum;
    }, 0);
  });
}

console.log(calculateErrors(response, uniqueDates)); // [ 2, 6 ]

// Задание 3. Для каждой даты подсчитать количество потраченного времени
function calculateTimeSpent(response, uniqueDates) {
  return uniqueDates.map((date) => {
    return response.reduce((cum, curr) => {
      if (curr.start.split(' ')[0] === date) {
        const start = moment(curr.start, 'DD.MM.YYYY HH:mm:ss');
        const finish = moment(curr.finish, 'DD.MM.YYYY HH:mm:ss');
        cum += finish.diff(start, 'seconds');
      }
      return cum;
    }, 0);
  });
}

console.log(calculateTimeSpent(response, uniqueDates)); //[ 33, 505 ]
