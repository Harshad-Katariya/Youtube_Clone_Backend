import { Router } from "express"
import { commentvideo } from "../../Controller/Comment/Comment_Video"
import { IS_Verify } from "../../Middleware/Is_Verify"


class CommentRoute{

    public route: Router = Router()
    constructor() {
        this.config()
    }
    config(){
        this.route.post('/addcomment',IS_Verify.is_verify_user,commentvideo.videocomment)
        this.route.get('/getcomment',IS_Verify.is_verify_user,commentvideo.getallcomment)
    }
}

const commentRoute = new CommentRoute()
export default commentRoute.route
