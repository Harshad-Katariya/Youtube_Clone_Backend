import { Request, Response } from "express";
import video from 'get-video-duration'
import { response } from "../../helper/response";
import jwt from 'jsonwebtoken';
import { CookieParser } from "../../Comman/Cookies";
import dotenv from 'dotenv'
import { dbservice } from "../../dbservice/dbservice"
dotenv.config()

class ShortVideo {
    public async shortvideoupload(req: Request, res: Response): Promise<any> {
        let cooike_split: any = CookieParser.UserCookie(req)
        let token_decode = jwt.verify(cooike_split, process.env.JWT_KEY as string)

        let channel_split: any = CookieParser.ChannelCreateCookie(req)
        let token_decode1 = jwt.verify(channel_split, process.env.JWT_KEY as string)

        const filePath: any = req.file?.path.replace(/\\/g, '/');

        console.log("video File ===--->", req.file?.buffer);
        console.log('Token Decode =====---->', token_decode, token_decode1);

        const payload =
        {
            short_video_file: `http://${process.env.DB_HOST}:${process.env.PORT_NUM}/${filePath}`,
            short_video_title: req.body.short_video_title,
            short_video_description: req.body.short_video_description,
            channel_id: token_decode1,
            user_id: token_decode
        }
        let result = await dbservice.shortvideoDBservice.shortvideo(payload)


        if (result) {
            console.log('Short Video Upload ====-->', payload);
            response.setResponse(200, { message: 'Success', payload }, res, req)
        }
        else {
            response.setResponse(400, { message: 'Invalid Data' }, res, req)
        }
    }

    public async getallshortvideo(req: Request, res: Response): Promise<any> {
        let resp: any = {}
        let getall = await dbservice.shortvideoDBservice.getallshort(resp)

        if (!getall) {
            response.setResponse(400, { message: 'Invalid Data' }, res, req)
        }
        else {
            response.setResponse(200, { message: 'Success', data: getall }, res, req)
        }
    }

    public async getmyshortvideo(req: Request, res: Response): Promise<any> {
        let cooike_decode: any = CookieParser.UserCookie(req)
        let token_decode = jwt.verify(cooike_decode, process.env.JWT_KEY as string)

        let getmyshort = await dbservice.shortvideoDBservice.getmyshortvideo(token_decode)

        if (getmyshort) {
            response.setResponse(200, { message: 'Success', data: getmyshort }, res, req)
        }
        else {
            response.setResponse(400, { message: 'Invalid Data....' }, res, req)
        }
    }
}

export const shortvideo = new ShortVideo()