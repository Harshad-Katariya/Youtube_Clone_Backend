import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class CreateVideoDBservice extends CommanDBService {
    public async uploadvideo(data: any): Promise<any> {
        let upload_video_qurey = 'INSERT INTO tbl_video SET ?'

        let result = await writeConnection.insert(upload_video_qurey, [data])

        return result
    }

    public async totalvideo(channel_id: any): Promise<any> {
        let video_count_qurey = 'SELECT (SELECT COUNT(*) FROM tbl_video WHERE channel_id = ?) as total_video'

        let result = await readConnection.select(video_count_qurey, [channel_id])

        return result[0]
    }

    public async getallvideo(data: any): Promise<any> {
        let get_all_video_qurey = 'SELECT video.video_id,video.video_title,video.video_description,video.video_file,video.video_thumbnail,video_language.video_language,video_category.video_category_name,video_channel.channel_name FROM tbl_video as video LEFT JOIN tbl_language as video_language ON video_language.video_language_id = video.video_language_id LEFT JOIN tbl_category as video_category ON video_category.video_category_id = video.video_category_id LEFT JOIN tbl_channel as video_channel ON video_channel.channel_id = video.channel_id'

        if(data.q){
             get_all_video_qurey += ` WHERE lower(video.video_title) LIKE "%${data.q.toLowerCase().trim()}%" OR lower(video_channel.channel_name) LIKE "%${data.q.toLowerCase().trim()}%" OR lower( video.video_description) LIKE "%${data.q.toLowerCase().trim()}%" OR lower( video_category.video_category_name) LIKE "%${data.q.toLowerCase().trim()}%"`
        }

        let result = await readConnection.select(get_all_video_qurey,[data])

        return result
    }

    public async getmyvideo(user_id: any): Promise<any> {
        let get_my_video_qurey = 'SELECT video.video_id,video.video_title,video.video_description,video.video_file,video.video_thumbnail,video_language.video_language,video_category.video_category_name,video_channel.channel_name FROM tbl_video as video LEFT JOIN tbl_language as video_language ON video_language.video_language_id = video.video_language_id LEFT JOIN tbl_category as video_category ON video_category.video_category_id = video.video_category_id LEFT JOIN tbl_channel as video_channel ON video_channel.channel_id = video.channel_id WHERE video.user_id = ?'

        let result = await readConnection.select(get_my_video_qurey, [user_id])

        return result
    }
    public async getvideobyclick(video_id: number): Promise<any> {

        let get_video_by_click_qurey = `SELECT tv.video_id,tv.video_title,tv.video_file,tv.video_thumbnail,tc.channel_id,tc.channel_name,GROUP_CONCAT(DISTINCT tcm.comment_id ORDER BY tcm.comment_id DESC) as comment_id,GROUP_CONCAT(DISTINCT CONCAT(tcm.comment_id,'/#/',tcm.comment) ORDER BY tcm.comment_id DESC) as comment,GROUP_CONCAT(DISTINCT CONCAT(tcm.comment_id,'/#/',tcm.user_id) ORDER BY tcm.comment_id DESC) as user_id,GROUP_CONCAT(DISTINCT CONCAT(tcm.comment_id,'/#/',tu.username) ORDER BY tcm.comment_id DESC) as user_name FROM tbl_video tv LEFT JOIN tbl_channel AS tc ON tc.channel_id = tv.channel_id LEFT JOIN tbl_comment AS tcm ON tcm.video_id = tv.video_id LEFT JOIN tbl_user AS tu ON tu.user_id = tcm.user_id WHERE tv.video_id = ? GROUP BY tv.video_id`

        let result = await readConnection.select(get_video_by_click_qurey, [video_id])

        return result
    }
}
