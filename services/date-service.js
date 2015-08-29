var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];

function toDoubleDigits(value) {
    return value < 10 ? '0' + value : value;
}

function toTwelveHourNotation(hours, minutes) {
    minutes = toDoubleDigits(minutes);

    if (hours < 12) {
        return hours == 0 ? '12:' + minutes + 'am'
            : hours + ':' + minutes + 'am';
    } else {
        return hours == 12 ? '12:' + minutes + 'pm'
            : hours % 12 + ':' + minutes + 'pm';
    }
}

// Perhaps there is a more elegant method that does this.
function toEnglishTime(date) {
    var englishDate = new Date(date);

    englishDate.setHours(date.getHours() + 1);

    return englishDate;
}

module.exports = {
    parse: function(dateAsString) {
        var date = toEnglishTime(new Date(dateAsString));

        return date.getDate() + ' ' + months[date.getMonth()] + ' at '
            + toTwelveHourNotation(date.getHours(), date.getMinutes());
    }
};