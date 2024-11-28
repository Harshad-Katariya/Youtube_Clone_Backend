import { NextFunction, Request, Response } from "express";
import { CookieParser } from "../Comman/Cookies";
import jwt from 'jsonwebtoken'
import { dbservice } from "../dbservice/dbservice";
import moment from "moment";
import { response } from "../helper/response";

export const Is_Premium = async (req: Request, res: Response, next: NextFunction) => {

    let cookie_decode: any = CookieParser.UserCookie(req)
    let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

    let is_premium_check = await dbservice.paymentDBservice.paymentcheck(token_decode)
    
    if (is_premium_check.length == 0) {
        return response.setResponse(400, { messaage: 'This Future For Only Premium Version' }, res, req) 
    }
    else if (is_premium_check[0].payment_status != 'complate') {
        return response.setResponse(402, { message: 'Plase Try Aagin Payment...' }, res, req)
    } 
    else if (moment(is_premium_check[0].premium_expire).format('YYYY-MM-DD HH:mm:ss') < moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')) {  
        return response.setResponse(400, { message: 'You Premium Is Expired' }, res, req)
    }
    else {
        next()
    }
}