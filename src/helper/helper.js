const stringDateToHoursAndMinute = (stringDate) => {
    return new Date(parseInt(stringDate))
        .toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
        })
}

module.exports = {stringDateToHoursAndMinute}