import { Request, Response } from "express";
import { dbservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import { WatchLater } from "../../Model/Watch_Later/WatchLaterModel";
import { CookieParser } from "../../Comman/Cookies";
import jwt, { JwtPayload } from 'jsonwebtoken'

class WatchVideolater {
    public async watchvideolater(req: Request, res: Response): Promise<any> {
        let cookie_decode: any = CookieParser.UserCookie(req)
        let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
        const user_id = typeof token_decode === 'string'
            ? parseInt(token_decode)
            : parseInt((token_decode as JwtPayload).id);


        const watchlater: WatchLater =
        {
            video_id: req.body.video_id,
            user_id,
            channel_id: req.body.channel_id
        }

        let result = await dbservice.watchvideolater.watchvideolater(watchlater)
        console.log("Watch Later ----->>>>>>>===-->", watchlater);

        if (!result) {
            response.setResponse(400, { message: 'Somting Bad...' }, res, req)
        }
        else {
            response.setResponse(200, { message: 'Success', watchlater }, res, req)
        }
    }

    public async getwatchlater(req: Request, res: Response): Promise<any> {
        let cookie_decode: any = CookieParser.UserCookie(req)
        let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

        let result = await dbservice.watchvideolater.getwatchlater(token_decode)

        if (result.length == 0) {
            response.setResponse(404, { message: 'Watch Later Is Empty...' }, res, req)
        }
        else {
            response.setResponse(200, { message: 'Success', you_watch_later: result }, res, req)
            console.log('Watch Later Get =====----->', result);
        }
    }
}

export const watchvideolater = new WatchVideolater()