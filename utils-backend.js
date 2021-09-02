import dayjs from 'dayjs';
import isTomorrow from 'dayjs/plugin/isTomorrow.js';
import isToday from 'dayjs/plugin/isToday.js';
dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export const timeConvert = (x) => {
    let hour = Number(x.split(":")[0]);
    let minute = x.split(":")[1];
    let meridian = (hour >= 12) ? "pm" : "am";
    if (hour >= 13) hour = hour - 12;
    if (hour === 0) hour = 12; // Midnight --

    return hour + ":" + minute + meridian;
}

export const prefixCheck = (testDate) => {
    if (dayjs(testDate).add(0, 'day').isTomorrow()) {
        return "Tomorrow! ";
    }

    if (dayjs(testDate).isToday()) {
        return "Today! ";
    }

    return "";
}

export const priceCheck = (price) => {
    return (price === "0") ? "Free" : "$" + price;
}