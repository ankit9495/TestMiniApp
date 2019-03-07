export const getHourAndMinute_24 = (time) => {
    let hours = Number(time.match(/^(\d+)/)[1]),
        minutes = Number(time.match(/:(\d+)/)[1]),
        AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    let sHours = hours.toString(),
        sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    let hourAndMin_24 = {sHours: sHours, sMinutes: sMinutes};
    return hourAndMin_24;
};