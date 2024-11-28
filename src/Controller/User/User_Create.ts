import { Request, Response } from "express";
import { response } from "../../helper/response";
import { dbservice } from "../../dbservice/dbservice";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CookieParser } from "../../Comman/Cookies";
import { LoginUser, UserRegister } from "../../Model/User/UserModel";
import { validationResult } from "express-validator";

class CreateUser {

    public async createuser(req: Request, res: Response): Promise<any> {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        try {
            const filePath = req.file?.path.replace(/\\/g, '/');
            const userregister: UserRegister =
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                user_profile: `http://${process.env.DB_HOST}:${process.env.PORT_NUM}/${filePath}`,
                country_id: req.body.country_id,
                state_id: req.body.state_id,
                city_id: req.body.city_id
            }
            let pass_hash = await bcryptjs.hash(userregister.password, 10)
            userregister.password = pass_hash

            let checkuser = await dbservice.userDBservice.checkUser(req.body.email)

            if (checkuser) {
               return response.setResponse(400, { message: 'Email Already Exits' }, res, req)
            }
            else {
                console.log('User Create ===---->', userregister);

                let result = await dbservice.userDBservice.createUser(userregister)
                response.setResponse(200, { message: "User Register SuccessFully", data: userregister }, res, req);

            }
        } catch (error) {
            console.log("CreateUser Error ====--->", error);
            response.setResponse(500, { message: 'Internal Server Error' }, res, req)
        }
    }

    public async loginuser(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        try {
            let userlogin = await dbservice.userDBservice.checkUser(req.body.email)

            const Loginuser: LoginUser =
            {
                email: req.body.email,
                password: req.body.password
            }

            if (userlogin) {
                let match_pass: any = await bcryptjs.compare(Loginuser.password, userlogin.password)
                let expire = 30 * 24 * 60 * 60 * 1000
                if (match_pass) {
                    let token_encode = jwt.sign(userlogin.user_id, process.env.JWT_KEY as string)
                    res.cookie(process.env.COOKIE_KEY as any, token_encode, { httpOnly: true, secure: true, maxAge: expire })

                    response.setResponse(200, { message: 'Login SuccessFully...', data: userlogin }, res, req)
                    console.log('User Login ===----->', userlogin);
                }

                else {
                    response.setResponse(400, { message: 'Invalid Email And Password' }, res, req)
                }
            }
            else {
                response.setResponse(400, { message: 'Invalid Email And Password' }, res, req)
            }
        } catch (error) {
            console.log("LoginUser Error ====--->", error);
            response.setResponse(500, { message: 'Internal Server Error' }, res, req)
        }

    }
    public async deleteuser(req: Request, res: Response): Promise<any> {
        try {

            let cookie_decode: any = req.headers.cookie?.split(`${process.env.COOKIE_KEY}=`)[1]
            let token_decode = jwt.verify(cookie_decode, process.env.JWT_KEY as string)
            let result = await dbservice.userDBservice.deleteuserupdate(token_decode)
            console.log('User Cookie Check ===---->', cookie_decode);
            if (result) {
                response.setResponse(200, { message: 'User Delete SuccesFully' }, res, req)
                res.clearCookie(process.env.COOKIE_KEY as string)
            }
            else {
                response.setResponse(404, { message: 'Data Not Found' }, res, req)
            }
        } catch (error) {
            console.log('Error From User Delete ======---->', error);
            response.setResponse(500, { message: 'Internal Server Error.....' }, res, req)
        }
    }

    public async homepage(req: Request, res: Response): Promise<any> {
        response.setResponse(200, { message: 'Welcome To Home Page' }, res, req)
    }
}

export const createUser = new CreateUser()