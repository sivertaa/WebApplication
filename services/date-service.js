var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

function toDoubleDigits(value) {
    return value < 10 ? "0" + value : value;
}

function toTwelveHourNotation(hours, minutes) {
    minutes = toDoubleDigits(minutes);

    return hours < 12 ? hours + ":" + minutes + "am"
        : (hours - 12) + ":" + minutes + "pm";
}

module.exports = {
    parse: function(dateAsString) {
        var date = new Date(dateAsString);

        return date.getDate() + " " + months[date.getMonth()] + " at "
            + toTwelveHourNotation(date.getHours(), date.getMinutes());
    }
};