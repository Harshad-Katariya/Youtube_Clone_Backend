import { Request, Response, Router } from "express";
import { cretaechannel } from "../../Controller/Channel/Channel_Create";
import { channel_image } from "../../Middleware/fileupload";
import { IS_Verify } from "../../Middleware/Is_Verify";


class ChannelRoute {
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config() {
        this.route.post('/create', IS_Verify.is_verify_user, channel_image.single('channel_banner_image'), cretaechannel.createchannel)
        this.route.get('/getchannel',IS_Verify.is_verify_user,cretaechannel.getchannel)
    }
}

const channelRoute = new ChannelRoute()
export default channelRoute.route
