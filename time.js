export const timeConvert = (x) => {
    let hour = Number(x.split(":")[0]);
    let minute = x.split(":")[1];
    let meridian = (hour >= 12) ? "pm" : "am";
    if (hour >= 13) hour = hour - 12;

    return hour + ":" + minute + meridian;
}