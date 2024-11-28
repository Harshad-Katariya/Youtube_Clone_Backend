import { read } from "fs";
import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class Playlist extends CommanDBService {

    public async createplaylist(user_id: any): Promise<any> {

        let createplaylist_qurey = `INSERT INTO tbl_playlists SET ?`

        let result = await writeConnection.insert(createplaylist_qurey, [user_id])

        return result
    }

    public async checkuserplaylist(user_id:any): Promise<any>{
        let check_user_playlist_qurey = `SELECT * FROM tbl_playlists WHERE user_id = ?`

        let result = await readConnection.select(check_user_playlist_qurey,[user_id])

        return result
    }

    public async addplaylist(data: any): Promise<any> {

        let addplaylist_qurey = `INSERT INTO tbl_user_playlist SET ?`

        let result = await writeConnection.insert(addplaylist_qurey, [data])

        return result
    }

    public async getplaylist(playlists_id: any, user_id: any): Promise<any> {

        let get_playlist_qurey = `SELECT tp.playlist_name,GROUP_CONCAT(CONCAT(tup.playlist_id,'/#/',tv.video_id) ORDER BY tup.playlist_id DESC) as video_id,GROUP_CONCAT(CONCAT(tup.playlist_id,'/#/',tv.video_file) ORDER BY tup.playlist_id DESC) as video_file,GROUP_CONCAT(CONCAT(tup.playlist_id,'/#/',tv.video_thumbnail) ORDER BY tup.playlist_id DESC) as video_thumbnail FROM tbl_user_playlist tup LEFT JOIN tbl_playlists AS tp ON tp.playlists_id = tup.playlists_id LEFT JOIN tbl_video AS tv ON tv.video_id = tup.video_id LEFT JOIN tbl_user AS tu ON tu.user_id = tup.user_id WHERE tup.playlists_id = ? AND tup.user_id = ? GROUP BY tup.playlists_id`

        let result = await readConnection.select(get_playlist_qurey, [playlists_id, user_id])

        return result
    }

    public async getmyallplaylist(user_id:number,data:any): Promise<any>{

        let get_my_all_playlist = `SELECT tp.playlist_name,COUNT(tup.video_id) as total_playlist_video FROM tbl_user_playlist as tup LEFT JOIN tbl_playlists as tp ON tp.playlists_id = tup.playlists_id WHERE tp.user_id = ? GROUP BY tp.playlist_name`
        let order_by = ` ORDER BY tup.playlist_id ASC`

        if(data.filter=='a_z'){
        get_my_all_playlist += order_by
        }
        else if(data.filter=='recently_added'){
            order_by = ' ORDER BY tup.playlist_id DESC'
            get_my_all_playlist += order_by
        }
        else{
        get_my_all_playlist
        }
        let result = await readConnection.select(get_my_all_playlist,[user_id])
        return result
    }
} 