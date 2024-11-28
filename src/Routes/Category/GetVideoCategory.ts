import { Router } from "express";
import { getvideo } from "../../Controller/Category/Get_Cetegory";
import { IS_Verify } from "../../Middleware/Is_Verify";


class GetVideoCategory {
    public route: Router = Router()

    constructor() {
        this.config()
    }

    config() {
        this.route.get('/category',IS_Verify.is_verify_user,getvideo.getcategoryvideo)
    }
}

const findcategory = new GetVideoCategory()
export default findcategory.route