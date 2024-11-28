import { check } from 'express-validator'

exports.playlist = () =>{
    return[
    check('filter')
    .optional()
    .isIn(['a_z','recently_added'])
    .withMessage('Invalid Filter')
    .escape()
    ]
}