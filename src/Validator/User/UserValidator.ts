const { check } = require('express-validator')

exports.usersignup = () => {
    return [
    check('username')
        .trim()
        .notEmpty()
        .withMessage('Username Is Require')
        .matches(/^[A-Z][A-Za-z ]*$/)
        .withMessage('Plese Enter Valid Username')
        .escape(),
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email Is Require')
        .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        .withMessage('Plese Enter valid Email')
        .escape(),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password Is Require...')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/)
        .withMessage('Password Must Contain At Least One Uppercase Letter, One Special Character, And Be At Least 8 Characters Long')
        .escape(),
    ]    
}

exports.userlogin = () => {
    return[
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Plese Enter Blank Email')
        .escape(),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Plese Enter Blank Password')
        .escape()
    ]
}