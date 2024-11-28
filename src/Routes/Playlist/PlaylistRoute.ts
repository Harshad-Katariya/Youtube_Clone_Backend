import { Router } from "express"
import { playlist } from "../../Controller/Playlist/Playlist"
import { IS_Verify } from "../../Middleware/Is_Verify"
import { Is_Premium } from "../../Middleware/is_premium"

const playlistvalidator = require('../../Validator/Playlist/PlaylistValidator')

class PlaylistRoute{
    public route: Router = Router()

    constructor() {
        this.config()
    }
    config(){
        this.route.post('/createplaylist',IS_Verify.is_verify_user, Is_Premium, playlist.createplaylist)
        this.route.post('/addplaylist',IS_Verify.is_verify_user, Is_Premium, playlist.addplaylist)
        this.route.get('/getplaylist',IS_Verify.is_verify_user, Is_Premium, playlist.getuserplaylist)
        this.route.get('/getallmyplaylist',IS_Verify.is_verify_user, Is_Premium, playlistvalidator.playlist(), playlist.getmyallplaylist)
    }
}

const playlistroute = new PlaylistRoute()
export default playlistroute.route