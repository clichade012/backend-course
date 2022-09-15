function whitespace(str) {
    return str.indexOf(" ") >= 0
}

function stringContainsNumber(_string) {
    return /\d/.test(_string);
}
function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // w use for char * use for breakpoint $ for end
    if (regex.test(emailAdress))
        return true;
    else
        return false;
}

const isValidName = function (name) {
    try {
        if (!name) {
            return "intern name is required."
        }
        if (typeof name !== 'string') {
            return "intern name should be in string!"
        }
        if (stringContainsNumber(name)) {
            return "intern name should be  in letters! ." 
        }
    }
    catch (error) {
        return message.error
    }
}


const isValidEmail = function (email) {
    try {
        if (!email) {
            return "email is required ! "
        }
        if (typeof email !== 'string') {
            return "email should be in string ! "
        }
        if (whitespace(email)) {
            return "Make sure email should not have any  space ! " 
        }
        let EmailId = isEmail(email)
        if (EmailId == false) {
            return "Please provide valid email address !" 
        }
    }
    catch (error) {
        return message.error
    }
}


const isValidMobile = function (mobile) {
    try {
        if (!mobile) {
            return "mobile number is required !"
        }
        if (typeof mobile !== 'string') {
            return "mobile number should be in string ! "
        }
        if (whitespace(mobile)) {
            return "Make sure mobile  number should not have space ! " 
        }
        if (mobile.length< 10 || mobile.length>10) {
            return "mobile number should be of 10 digits ! "
        }
    }
    catch (error) {
        return message.error
    }
}



const isValidcollegeName = function (collegeName) {
    try {
        if (!collegeName) {
            return "college name is required."
        }
        if (typeof collegeName !== 'string') {
            return "collge name should be in string ! "
        }
        if (whitespace(collegeName)) {
            return "Make sure college name should not have space ! " 
        }
    }
    catch (error) {
        return message.error
    }
}




module.exports = {isValidName, isValidEmail, isValidMobile, isValidcollegeName}

