import { Router } from "express";
import { subscribe } from "../../Controller/Subscribe/Subscribe";
import { IS_Verify } from "../../Middleware/Is_Verify";

class SubscribeRoute {
    public route: Router = Router()

    constructor() {
        this.config()
    }
    config() {
        this.route.post('/usersubscribe',IS_Verify.is_verify_user,subscribe.subscribe)
        this.route.get('/getsubscription',IS_Verify.is_verify_user,subscribe.getsubscriptionchannel)
        this.route.get('/getsubscriptionvideo',IS_Verify.is_verify_user,subscribe.getsubscriptionvideo)
    }
}

const subscriberoute = new SubscribeRoute()
export default subscriberoute.route