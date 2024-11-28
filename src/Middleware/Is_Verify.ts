import { NextFunction, Request, Response } from "express";
import { response } from "../helper/response";
import jwt from 'jsonwebtoken';
import { CookieParser } from "../Comman/Cookies";

class Is_Verify {
    public async is_verify_user(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.UserCookie(req)
            console.log('Tooken verify ====----> ', cookie_decode);

            if (!cookie_decode) {
                response.setResponse(401, { msg: 'Unauthorized User....' }, res, req)
            }

            let Token_Decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            console.log('Token  Deccode ====--->', Token_Decode);

            if (Token_Decode) {
                next()
            }
            else {
                response.setResponse(401, { msg: 'Invalid Token...' }, res, req)
            }

        } catch (error) {
            console.log('Error ==------>', error);
            response.setResponse(500, { msg: 'Internal Server Error...' }, res, req)
        }
    }

    public async is_channel_create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.ChannelCreateCookie(req)

            if (!cookie_decode) {
                response.setResponse(401, { message: 'Channel Not Create ' }, res, req)
            } 
            let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
            if (token_decode) {
                next()
            }
            else {
                response.setResponse(401, { message: 'Invalid Token...' }, res, req)
            }
        } catch (error) {
            console.log('Error ====---->', error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }
}

export const IS_Verify = new Is_Verify()