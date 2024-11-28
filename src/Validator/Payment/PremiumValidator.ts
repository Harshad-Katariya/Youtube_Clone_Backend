import { check } from "express-validator";

exports.premium = () => {
    return[
        check('payment_amount')
        .trim()
        .notEmpty()
        .withMessage('Amount Is Require')
        .isInt({ min: 500, max: 500}) 
        .withMessage('Amount must be ₹500.')
        .escape()
    ]
}