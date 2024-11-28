import { Request, Response, Router } from "express";
import { createUser } from "../../Controller/User/User_Create";
import { IS_Verify } from "../../Middleware/Is_Verify";
import { channel_image } from "../../Middleware/fileupload";
import { login_page } from "../../Controller/Payment/Payment";

const uservalidator = require('../../Validator/User/UserValidator')
class UserRoute {
    public route: Router = Router()

    constructor() {
        this.config()
    }
    config(): void {
        this.route.post('/signup',channel_image.single('user_profile'),uservalidator.usersignup(),createUser.createuser)
        this.route.post('/login',uservalidator.userlogin(),createUser.loginuser)
        this.route.delete('/delete',IS_Verify.is_verify_user,createUser.deleteuser)
        this.route.get('/home', IS_Verify.is_verify_user, createUser.homepage)
        this.route.get('/login',login_page)
    }
}

const userRoute = new UserRoute()
export default userRoute.route