import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { CommanDBService } from "../commandbservice";



export class WatchVideolater extends CommanDBService {
    public async watchvideolater(data: any): Promise<any> {
        let watchlater_qurey = 'INSERT INTO tbl_watch_later SET ?'

        let result = await writeConnection.insert(watchlater_qurey, [data])

        return result
    }
    public async getwatchlater(user_id: any): Promise<any> {
        let getwatchlater_query = `SELECT  watch_later_video.video_title,watch_later_video.video_description,watch_later_video.video_file,watch_later_video.video_thumbnail,watch_later_language.video_language,watch_later_category.video_category_name,watch_later_channel.channel_name FROM tbl_watch_later as watch_later LEFT JOIN tbl_video as watch_later_video ON watch_later_video.video_id = watch_later.video_id LEFT JOIN tbl_language as watch_later_language ON watch_later_language.video_language_id = watch_later_video.video_id LEFT JOIN tbl_category as watch_later_category ON watch_later_category.video_category_id = watch_later_video.video_category_id LEFT JOIN tbl_channel as watch_later_channel ON watch_later_channel.channel_id = watch_later_video.channel_id  WHERE watch_later.user_id=?`

        let result = await readConnection.select(getwatchlater_query, [user_id])

        return result
    }
}