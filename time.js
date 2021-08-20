export const timeConvert = (x) => {
    let meridian = "am";

    let hour = Number(x.split(":")[0]);
    let minute = x.split(":")[1];

    if (hour >= 12) {
        meridian = "pm";
    }

    if (hour >= 13) {
        // Converts 24 hour to 12;
        hour = hour - 12;
    }

    return hour + ":" + minute + meridian;
}