import { Request, Response } from "express";
import { dbservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CookieParser } from "../../Comman/Cookies";
import { getvideomodel, VideoUpload } from "../../Model/Video/VideoModel";

class Video {
   public async uploadvideo(req: Request, res: Response): Promise<any> {
      try {

         let user_cookie_split: any = CookieParser.UserCookie(req)
         let channel_cookie_split: any = CookieParser.ChannelCreateCookie(req);
         let user_token_decode = jwt.verify(user_cookie_split, process.env.JWT_KEY as string);
         let channel_token_decode = jwt.verify(channel_cookie_split, process.env.JWT_KEY as string);
         const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
         const video_file = files['video_file']?.[0];
         const thumbnail_file = files['video_thumbnail']?.[0];
         console.log('Request Dot File =====------------------>', req.files);

         const video_path = video_file.path.replace(/\\/g, '/');
         const thumbnail_path = thumbnail_file.path.replace(/\\/g, '/');
         console.log("Video File ====--->", req.file)

         const channel_id = typeof channel_token_decode === 'string'
            ? parseInt(channel_token_decode)
            : parseInt((channel_token_decode as JwtPayload).id);

         const user_id = typeof user_token_decode === 'string'
            ? parseInt(user_token_decode)
            : parseInt((user_token_decode as JwtPayload).id);

         const Videoupload: VideoUpload =
         {
            video_title: req.body.video_title,
            video_description: req.body.video_description,
            video_file: `http://${process.env.DB_HOST}:${process.env.PORT_NUM}/${video_path}`,
            video_thumbnail: `http://${process.env.DB_HOST}:${process.env.PORT_NUM}/${thumbnail_path}`,
            video_language_id: parseInt(req.body.video_language_id),
            video_category_id: parseInt(req.body.video_category_id),
            channel_id,
            user_id
         }
         console.log('Video Upload =====-->', Videoupload.video_file, Videoupload.video_thumbnail);

         let result = await dbservice.createvideoDBservice.uploadvideo(Videoupload)

         if (result) {
            console.log('Video Upload Data ===--->', Videoupload);
            response.setResponse(200, { message: 'Success', Videoupload }, res, req)
         }
         else {
            response.setResponse(400, { message: 'Something Wrong', result }, res, req)
         }
         console.log('upload Video Cooike  ======--->', user_token_decode, channel_token_decode);
      } catch (error) {
         console.log('Upload Video Error ===--->', error);
         response.setResponse(500, { message: 'Internal Server Error......' }, res, req)

      }
   }

   public async getall(req: Request, res: Response): Promise<any> { 
      let data = req.query
      let result = await dbservice.createvideoDBservice.getallvideo(data)

      if (result.length > 0) {
         response.setResponse(200, { message: 'Success', data: result }, res, req)
      }
      else {
         response.setResponse(404,{message:'No Search Found'},res,req)
      }
   }

   public async getmyvideo(req: Request, res: Response): Promise<any> {

      let cookie_decode: any = CookieParser.UserCookie(req)
      let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
      let result = await dbservice.createvideoDBservice.getmyvideo(token_decode)

      if (!result) {
         response.setResponse(500, { messgae: 'Somithig get My Video Error.....' }, res, req)
      }
      else {
         response.setResponse(200, { messgae: 'Success', data: result }, res, req)
         console.log('Get My Video =====--->', result);
      }
   }
   public async getvidobyclick(req: Request, res: Response): Promise<any> {

      try {

         let data: any = req.query.video_id;
         console.log("Req Query ==---->", data);
         let result = await dbservice.createvideoDBservice.getvideobyclick(data);
         console.log('Result Query ===----->', result);
         let resp: any = [];
         for (let i = 0; i < result.length; i++) {
            let video: any = result[i];
            let videoData = {
               video_id: video.video_id,
               video_title: video.video_title,
               video_file: video.video_file,
               video_thumbnail: video.video_thumbnail,
               channel_id: video.channel_id,
               channel_name: video.channel_name,
            };
            let commentarry: any = [];
            if (video.comment_id != null) {
               let commentid = video.comment_id.split(',').map((id: string) => parseInt(id));
               let comments = video.comment.split(',').map((comment: string) => comment.split('/#/')[1]);
               let userId = video.user_id.split(',').map((userid: string) => parseInt(userid.split('/#/')[0]));
               let usernames = video.user_name.split(',').map((username: string) => username.split('/#/')[1]);
               console.log('Comment Id ===--->', commentid);
               console.log('Comment ===--->', comments);
               console.log('User Id ===--->', userId);
               console.log('User Names ===--->', usernames);
               for (i = 0; i < commentid.length; i++) {
                  commentarry.push({   
                     comment_id: commentid[i],
                     comment: comments[i],
                     user_id: userId[i],
                     username: usernames[i]
                  });
               }
            }
            resp.push({ ...videoData, comments: commentarry });
         }
         response.setResponse(200, { message: 'Success', data: resp }, res, req);
      }catch (error) {
         console.log("Error On Get Video By Click ======----->", error);
         response.setResponse(500, { message: 'Internal Server Error....' }, res, req);
      }
   }
}
export const createvideo = new Video()