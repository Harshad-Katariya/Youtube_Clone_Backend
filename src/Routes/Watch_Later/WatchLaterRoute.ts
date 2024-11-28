import { Router } from "express";
import { watchvideolater } from "../../Controller/Watch_Later/Watch_Later";
import { IS_Verify } from "../../Middleware/Is_Verify";

class WatchVideolater {
    public route: Router = Router()
    constructor() {
        this.config()
    }
    config() {
        this.route.post('/watchlater',IS_Verify.is_verify_user,watchvideolater.watchvideolater)
        this.route.get('/getwatchlater',IS_Verify.is_verify_user,watchvideolater.getwatchlater)
    }
}

const watchlater = new WatchVideolater()
export default watchlater.route