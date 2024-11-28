import { Request, Response } from "express";
import { dbservice } from "../../dbservice/dbservice";
import { response } from "../../helper/response";


class GetCategory {
    public async getcategoryvideo(req: Request, res: Response): Promise<any> {
        const data = req.query.category

        let result = await dbservice.getcategoryDBservice.getcategory(data)

        if (!result || result == undefined || result == "")
            response.setResponse(404, { message: 'Category Not Found...' }, res, req)
        else
            response.setResponse(200, { category: result }, res, req)

        console.log('Resilt ====---->', result);

    }
}

export const getvideo = new GetCategory()