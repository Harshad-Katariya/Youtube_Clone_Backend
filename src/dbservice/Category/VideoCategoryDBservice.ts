import { readConnection } from "../../Config/readDbConnection";
import { CommanDBService } from "../commandbservice";


export class CategoryDBservice extends CommanDBService {
    public async getcategory(data: any): Promise<any> {
        let getcategoryvideo = 'SELECT channel.channel_id,channel.channel_name,category.video_category_name FROM tbl_video as video LEFT JOIN tbl_user as user ON user.user_id = video.user_id LEFT JOIN tbl_channel as channel ON channel.channel_id = video.channel_id LEFT JOIN tbl_category as category ON category.video_category_id = video.video_category_id WHERE category.video_category_name = ? ';

        let result = await readConnection.select(getcategoryvideo, [data])

        return result
    }
}