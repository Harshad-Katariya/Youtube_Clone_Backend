import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { CommanDBService } from "../commandbservice";


export class ShortVideo extends CommanDBService {
    public async shortvideo(data: any): Promise<any> {
        let upload_short_video_qurey = 'INSERT INTO tbl_short_video SET ?'

        let result = await writeConnection.insert(upload_short_video_qurey, [data])

        return result
    }

    public async getallshort(data: any): Promise<any> {
        let get_all_short_qurey = `SELECT short_video.short_video_id,short_video.short_video_file,short_video.short_video_title,short_video.short_video_description short_video_channel.channel_name,short_video_user.username FROM tbl_short_video as short_video LEFT JOIN tbl_channel as short_video_channel ON short_video_channel.channel_id = short_video.channel_id LEFT JOIN tbl_user as short_video_user ON short_video_user.user_id = short_video.user_id`

        let result = await readConnection.select(get_all_short_qurey, [data])

        return result
    }

    public async getmyshortvideo(user_id: any): Promise<any> {
        let get_my_short_qurey = `SELECT short_video.short_video_id,short_video.short_video_file,short_video.short_video_title,short_video.short_video_description, short_video_channel.channel_name,short_video_user.username FROM tbl_short_video as short_video LEFT JOIN tbl_channel as short_video_channel ON short_video_channel.channel_id = short_video.channel_id LEFT JOIN tbl_user as short_video_user ON short_video_user.user_id = short_video.user_id WHERE short_video_user.user_id = ?`

        let result = await readConnection.select(get_my_short_qurey, [user_id])

        return result
    }
}