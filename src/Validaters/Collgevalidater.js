function whitespace(str) {
    return str.indexOf(" ") >= 0
}
function stringContainsNumber(_string) {
    return /\d/.test(_string);
}
const isValidName = function (name) {
    try {
        if (!name) {
            return "college name is required."
        }
        if (typeof name !== 'string') {
            return "collge name should be string."
        }
        if (whitespace(name)) {
            return "Make sure college name should not have space." 
        }
        if (stringContainsNumber(name)) {
            return "collge name should be letters make sure only letters are present ! ." 
        }
    }
    catch (error) {
        return message.error
    }
}
const isValidfullName = function (fullName) {
    try {
        if (!fullName) {
            return "college fullName is required."
        }
        if (typeof fullName !== 'string') {
            return "collge fullName should be string."
        }
        if (stringContainsNumber(fullName)) {
            return "collge fullName should be letters and not allowed number." 
        }
    }
    catch (error) {
        return message.error
    }
}
const isValidLogoLink = function (logoLink) {
    try {
        if (!logoLink) {
            return "college logoLink is required."
        }
        if (typeof logoLink !== 'string') {
            return "collge logoLink should be string."
        }
        if (whitespace(logoLink)) {
            return "Make sure logoLink should not have space." 
        }
    }
    catch (error) {
        return message.error
    }
}



module.exports = { isValidName, isValidfullName, isValidLogoLink }