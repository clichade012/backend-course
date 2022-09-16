function whitespace(str) {
    return str.indexOf(" ") >= 0
}
function stringContainsNumber(_string) {
    return /\d/.test(_string);
}


const isValidName = function (name) {  
    try {
        if (!name) {
            return "college name is required!."
        }
        if (typeof name !== 'string') {
            return "collge name should be string!."
        }
        if (whitespace(name)) {
            return "Make sure college name should not have space!." 
        }
        if (stringContainsNumber(name)) {
            return "college name should be in letters! ." 
        }
    }
    catch (error) {
        return message.error
    }
}
const isValidfullName = function (fullName) {
    try {
        if (!fullName) {
            return "college fullName is required ! "
        }
        if (typeof fullName !== 'string') {
            return "college fullName should be in string ! "
        }
        if (stringContainsNumber(fullName)) {
            return "college fullName should be letters ! " 
        }
    }
    catch (error) {
        return message.error
    }
}
const isValidLogoLink = function (logoLink) {
    try {
        if (!logoLink) {
            return "college logoLink is required !"
        }
        if (typeof logoLink !== 'string') {
            return "college logoLink should be string !"
        }
        if (whitespace(logoLink)) {
            return "Make sure logoLink should not have any space !" 
        }
        let isURL = logoLink.match(/^https?[^\?].(jpg|jpeg|gif|png|tiff|bmp)(\?(.))?$/gmi) != null

        if (isURL == false) {
            return "please enter valid logoLink"
        }
    }
    catch (error) {
        return error.message
    }
}



module.exports = { isValidName, isValidfullName, isValidLogoLink }