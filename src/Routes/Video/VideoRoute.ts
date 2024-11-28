import { Request, Response, Router } from "express";
import { createvideo } from "../../Controller/Create Video/Video";
import { channel_image } from "../../Middleware/fileupload"
import { IS_Verify } from "../../Middleware/Is_Verify";
class VideoRoute {
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config() {
        this.route.post('/videoupload', IS_Verify.is_verify_user, IS_Verify.is_channel_create, channel_image.fields([{ name: 'video_file' }, { name: 'video_thumbnail' }]), createvideo.uploadvideo)
        this.route.get('/getallvideo', createvideo.getall)
        this.route.get('/getmyvideo',IS_Verify.is_channel_create,createvideo.getmyvideo)
        this.route.get('/watch',createvideo.getvidobyclick)
    }
}


const videoRoute = new VideoRoute()
export default videoRoute.route