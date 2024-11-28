import { Request, Response } from "express";
import { dbservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import jwt from 'jsonwebtoken';
import { CookieParser } from "../../Comman/Cookies";
import { ChannelCreate } from "../../Model/Channel/ChannelModel";
import { MailService } from "../../Comman/mail/welcome_channel_email";
import { validationResult } from "express-validator";


class Channel {
  public async createchannel(req: Request, res: Response): Promise<any> {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          response.setResponse(400,{message: errors.array()},res,req)
      }
    try {
      let cookie_split: any = CookieParser.UserCookie(req)
      let token_decode: any = jwt.verify(cookie_split, process.env.JWT_KEY as string)
      const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
      const filePath = req.file?.path.replace(/\\/g, '/');

      const ChannelCreate: ChannelCreate = {
        channel_name: req.body.channel_name,
        channel_about: req.body.channel_about,
        channel_banner_image: `http://${process.env.DB_HOST}:${process.env.PORT_NUM}/${filePath}`,
        channel_description: req.body.channel_description,
        channel_handle: req.body.channel_handle,
        user_id: parseInt(token_decode)
      }
      let result = await dbservice.channelDBservice.cratechannel(ChannelCreate)
      console.log("Channel Create Log =====---->",result);
      
      if (result) {
        let check = await dbservice.userDBservice.findemail(token_decode)
        let expire = 30 * 24 * 60 * 60 * 1000
        let token_encode: any = jwt.sign(result.insertId, process.env.JWT_KEY as string)
        res.cookie(process.env.CHANNEL_KEY as string, token_encode, { httpOnly: true, secure: true, maxAge: expire })
        response.setResponse(200, { message: 'Channel Create SuccessFullyy...', data: ChannelCreate }, res, req)
        console.log('Token Encode ===------>', token_encode);
        console.log('Channel Create -===--->', ChannelCreate);
        console.log('Cookie_Split =====---->', check[0].user_profile);
        // let channel_link = `http:`
        MailService(check[0].email, ChannelCreate.channel_name, check[0].user_profile)
      }
      else {
        response.setResponse(400, { message: ' Invalid Data...' }, res, req)
      }
    } catch (error) {
      console.log("Error ===------>", error);
      response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
    }

  }

  public async getchannel(req: Request, res: Response): Promise<any> {
    try {
      let cookie_split: any = CookieParser.UserCookie(req)
      let token_decode = jwt.verify(cookie_split, process.env.JWT_KEY as string)

      let channel_check = await dbservice.channelDBservice.channelcheck(token_decode)
      if (!channel_check || channel_check.length == 0 || !channel_check[0].channel_id) {
        return response.setResponse(404, { message: 'Please Create Channel First...' }, res, req);
      }

      let totalvideocount = await dbservice.createvideoDBservice.totalvideo(channel_check[0].channel_id)
      console.log('Get Channel ===---->', totalvideocount);

      let resp: any = {}
      resp.Total_Video = totalvideocount.total_video
      resp.channel_check = channel_check
      let expire = 30 * 24 * 60 * 60 * 1000
      let token_encode = jwt.sign(channel_check[0].channel_id, process.env.JWT_KEY as string)
      res.cookie(process.env.CHANNEL_KEY as string, token_encode, { secure: true, httpOnly: true, maxAge: expire })
      response.setResponse(200, { message: 'Success', data: resp }, res, req)

    } catch (error) {
      console.log('Error ==--->', error);
      response.setResponse(500, { message: 'Internal Server Error....' }, res, req)
    }
  }
}

export const cretaechannel = new Channel()