import {check} from 'express-validator'

exports.channelcreate = () =>{
    return[
    check('channel_name')
        .trim()
        .notEmpty()
        .withMessage('Channel Name Is Require')
        .escape(),
    check('channel_about')
        .trim()
        .notEmpty()
        .withMessage('Channel About Is Require')
        .escape(),
    check('channel_handle')
        .trim()
        .notEmpty()
        .withMessage('Channel Handle Is Require')
        .escape(),       
    ]
}
