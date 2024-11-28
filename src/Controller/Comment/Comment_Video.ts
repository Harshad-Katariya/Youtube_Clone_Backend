import { Request, Response } from "express";
import { CookieParser } from "../../Comman/Cookies";
import jwt from 'jsonwebtoken'
import { dbservice } from "../../dbservice/dbservice";
import { CommentModel } from "../../Model/Comment/CommentModel";
import { response } from "../../helper/response";

class CommentVideo {

    public async videocomment(req: Request, res: Response): Promise<any> {

        try {
            let cookie_split: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_split, process.env.JWT_KEY as string)
            console.log("Comment Tokenn Decode ===---->", token_decode);

            const commentPayload: CommentModel = {
                comment: req.body.comment,
                video_id: req.body.video_id,
                user_id: parseInt(token_decode)
            }

            let result = await dbservice.commentDBservice.videocomment(commentPayload)
            if (!result) {
                response.setResponse(400, { message: 'Somthing Comment Error....' }, res, req)
            }
            else {
                const payload = {
                    comment_id: result.insertId,
                    comment: req.body.comment,
                    video_id: req.body.video_id,
                    user_id: parseInt(token_decode)
                }
                response.setResponse(200, { message: 'Success', data: payload }, res, req)
                console.log("Comment test ==----->", commentPayload);
            }
        } catch (error) {
            console.log("Add Comment Error ==============-------->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }
    public async getallcomment(req: Request, res: Response): Promise<any> {
        let resp = {}
        let result = await dbservice.commentDBservice.getallcomment(resp)
        if (!result) {
            response.setResponse(400, { messgae: 'Somthing Comment Get Error...' }, res, req)
        }
        else {
            response.setResponse(200, { messgae: 'Success', data: result }, res, req)
        }
    }
}

export const commentvideo = new CommentVideo()