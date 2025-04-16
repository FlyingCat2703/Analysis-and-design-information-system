// YYYY-MM-DD
function validateDateFormat(date) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(date);
}

function isFutureDate(date) {
    if (!validateDateFormat(date)) {
        console.log("Invalid date format!");
        return false;
    }

    const today = new Date();
    const inputDate = new Date(date);
    
    return inputDate > today;
}

export { validateDateFormat, isFutureDate };