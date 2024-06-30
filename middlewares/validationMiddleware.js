import User from "../Features/user/user.model.js"
import { createDbConnection } from "../config/db.config.js";
import { checkValueEntered } from "../utils/helper.js";

// Below function will check the create user body
export async function checkCreateUserBody(req, res, next) {
    try
    {
        const { name, mobile, email, password } = req.body
        await checkValueEntered(name, `Name`)(req, res, next);
        await checkValueEntered(mobile, `Mobile`)(req, res, next);
        await checkValueEntered(email, `Email`)(req, res, next);
        await checkValueEntered(password, `Password`)(req, res, next);
        next();
    } 
    catch (error) 
    {
        console.log(`Error from checkCreateUserBody`, error.message);
    }
}

// Below function will check the body of the user signin
export async function checkSignInBody(req, res, next) {
    try
    {
        const { email, password } = req.body
        await checkValueEntered(email, `Email`)(req, res, next);
        await checkValueEntered(password, `Password`)(req, res, next);
        next();
    } 
    catch (error) 
    {
        console.log(`Error from checkSignInBody`, error.message);
    }
}

// Function to check if the password contains spaces
const hasSpaces = (password) => {
    return /\s/.test(password);
};

// Function to validate the password against the criteria
const isValidPassword = (password) => {
    const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,12}$/;
    return regexPattern.test(password);
};

// Below are the function for validating email.
const isvalidEmail = (email) => {
    const regex = (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$/);
    if (regex.test(email)) {
        const domain = email.split(`@`)[1]; // get domain name after `@` symbol
        const domainParts = domain.split(`.`); // split domain name by `.` separator
        return domainParts[1] === domainParts[2] ? false : true
    } else {
        return false
    }
};

// Password Validation function.
export async function passwordValidation(req, res, next) {
    let password = req.body.password;    
    if (hasSpaces(password)) {
        return res.status(400).json({
            status: false,
            error: "Password contains spaces. Not allowed."
        });
    } else {
        if (isValidPassword(password)) {
            next();
        } else {
            return res.status(400).json({
                status: false,
                error: "Password must contain at least one lowercase letter, one uppercase letter, one special character, and be 8-12 characters long."
            });
        }
    }
};

// The below function is for email validation.
export async function emailValidation(req, res, next) {
    if(hasSpaces(req.body.email) === true)
    {
        return res.status(400).json({
            status: false,
            error: `Email have spaces`
        });
    } else {
        if(isvalidEmail(req.body.email) != true) {
            return res.status(400).json({
                status: false,
                error: `Incorrect email format`
            });                            
        } else {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    if(req.url === "/user/signin") {
                        next();
                    } else {
                        return res.status(400).json({
                            status: false,
                            error: 'Email is already in use'
                        });
                    }
                } else {
                    next();
                }                
            } catch (error) {
                console.error("Error from emailValidation function", error.message);
                return res.status(500).json({
                    status: false,
                    error: 'Internal server error.'
                });
            }
        }
    }
}

const checkDuplicateEmail = async (req, res, next) => {
    const { id } = req.body;
    try {
        if(req.body.email) {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== id) {
                return res.status(400).json({ errors: [{ msg: 'Email already exists for another user' }] });
            }
            next();
        } else {
            console.log("Email is not updated this time");
            next();
        }
        
    } catch (err) {
        console.error('Error checking duplicate email:', err);
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }
};

// Middleware to validate mobile number format
export async function validateMobileNumber (req, res, next) {
    const { mobile } = req.body;
    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({
            status: false,
            error: 'Mobile number must be a 10-digit number'
        });
    }
    next();
};