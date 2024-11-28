import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { CommanDBService } from "../commandbservice";

export class CommentVideo extends CommanDBService{

    public async videocomment (user_id:any): Promise<any>{
        
        let add_comment_qurey = 'INSERT INTO tbl_comment SET ?';

        let result = await writeConnection.insert(add_comment_qurey,[user_id])

        return result
    }
    public async getallcomment (data:any): Promise<any>{

        let get_all_comment_qurey = `SELECT tc.comment_id,tv.video_id,tv.video_file,tc.comment,tu.username,tu.user_profile FROM tbl_comment as tc LEFT JOIN tbl_video as tv ON tv.video_id = tc.video_id LEFT JOIN tbl_user as tu ON tu.user_id = tc.user_id`

        let result = await readConnection.select(get_all_comment_qurey,[data])

        return result
    }
}
