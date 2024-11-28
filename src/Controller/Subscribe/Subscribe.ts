
import { Request, Response } from "express";
import { CookieParser } from "../../Comman/Cookies";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { dbservice } from "../../dbservice/dbservice";
import { Subscribemodel } from "../../Model/Subscribe/SubscibeModel";
import { response } from "../../helper/response";


class Subscribe {
    public async subscribe(req: Request, res: Response): Promise<any> {
        try {
            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            const user_id = typeof token_decode === 'string'
                ? parseInt(token_decode)
                : parseInt((token_decode as JwtPayload).id);

            let payload: Subscribemodel =
            {
                channel_id: req.body.channel_id,
                user_id

            }

            let check = await dbservice.subscribe.checksubscribe(req.body)
            console.log('Rock ===--->', check);

            if (check) {
                response.setResponse(400, { message: 'You Already Subscribe This Channel...' }, res, req)
            }
            else {
                let result = await dbservice.subscribe.subscribe(payload)
                response.setResponse(200, { message: 'Success', data: payload }, res, req)
            }
        } catch (error) {
            console.log('User Subscribe Input ===---->', error);
            response.setResponse(500, { messgae: 'Internal Server Error....' }, res, req)
        }
    }

    public async getsubscriptionchannel(req: Request, res: Response): Promise<any> {
        let cookie_decode: any = CookieParser.UserCookie(req)
        let token_decode:any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

        let result = await dbservice.subscribe.subscriptions(token_decode)

        if (!result) {
            response.setResponse(404, { message: 'Somthing Get Error...' }, res, req)
        }
        if (result.length <= 0) {
            response.setResponse(404, { message: 'Subscribe To Get The Latest Video From Channel That You Love.' }, res, req)
        }
        else {
            response.setResponse(200, { message: 'Success', data: result }, res, req)
        }
    }

    public async getsubscriptionvideo(req: Request, res: Response): Promise<any> {
        try {
            let data = req.query

            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            let GetSubscriptionId = await dbservice.subscribe.subscriptions(token_decode)

            console.log("Subscription Id =======--->", GetSubscriptionId[0].user_id);

            let result = await dbservice.subscribe.getsubscriptionvideo(GetSubscriptionId[0].user_id, data)
            console.log("Result =====----->", result);

            if (result.length > 0) {
                response.setResponse(200, { messgae: 'Sucess', data: result }, res, req)
            }
            else {
                response.setResponse(404, { message: 'Data Not Found...' }, res, req)
            }
        } catch (error) {
            console.log('Get Subscription Video Error ===--->', error);
            response.setResponse(500, { message: 'Internal Server Error....' }, res, req)
        }
    }
}

export const subscribe = new Subscribe()
