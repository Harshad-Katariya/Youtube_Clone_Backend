import { Router } from "express";
import { shortvideo } from "../../Controller/Short_Video/Short_Video";
import { video_file } from "../../Middleware/videoupload";
import { IS_Verify } from "../../Middleware/Is_Verify";

class ShortVideoRoute {
    public route: Router = Router()

    constructor() {
        this.config()
    }
    config() {
        this.route.post('/shortupload', IS_Verify.is_channel_create, video_file.single('short_video_file'), shortvideo.shortvideoupload)
        this.route.get('/getallshort', shortvideo.getallshortvideo)
        this.route.get('/myshort', IS_Verify.is_channel_create,shortvideo.getmyshortvideo)
    }
}


const shortvideoroute = new ShortVideoRoute()
export default shortvideoroute.route