import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";
import { Subscription } from "../../Model/Subscribe/SubscibeModel";
import { CommanDBService } from "../commandbservice";

export class Subscribe extends CommanDBService {
    public async subscribe(data: any): Promise<any> {
        let subscribe_qurey = `INSERT INTO tbl_subscribe SET ?`

        let result = await writeConnection.insert(subscribe_qurey, [data])

        return result
    }

    public async checksubscribe(channel_id: number): Promise<any> {
        let check_qurey = `SELECT * FROM tbl_subscribe WHERE channel_id = ?`

        let result = await readConnection.select(check_qurey, [channel_id])

        return result[0]
    }

    public async subscriptions(user_id: any): Promise<any> {
        let subscriptions_qurey = `SELECT sub.subscribe_id,sub.user_id,sub_channel.channel_name,sub_user.user_profile FROM tbl_subscribe as sub LEFT JOIN tbl_channel as sub_channel ON sub_channel.channel_id = sub.channel_id LEFT JOIN tbl_user as sub_user ON sub_user.user_id = sub_channel.user_id WHERE sub.user_id = ?`

        let result = await readConnection.select(subscriptions_qurey, [user_id])

        return result
    }

    public async getsubscriptionvideo(user_id:any, data:any): Promise<any> {
        let select = "tv.video_id,tv.video_title,tv.video_file,tv.video_thumbnail,tc.channel_name,tu.user_profile FROM tbl_subscribe as ts";
        let shortvideoselect = "tsv.short_video_id,tsv.short_video_file,tsv.short_video_title,tsv.short_video_description,tc.channel_name,tu.user_profile FROM tbl_subscribe as"
        let Wherecondition = "WHERE ts.user_id = ? "
        let getallvideoqurey = ""

        if (data.filter == "all") {
            getallvideoqurey = "SELECT " + select + " LEFT JOIN tbl_channel as tc ON tc.channel_id = ts.channel_id LEFT JOIN tbl_video as tv ON tv.channel_id = ts.channel_id LEFT JOIN tbl_user as tu ON tu.user_id = tv.user_id " + Wherecondition + ' ORDER BY tv.video_id DESC'
        }
        else if (data.filter == "today") {
            Wherecondition = "WHERE ts.user_id = ? AND DATE(tv.created_on) = CURRENT_DATE()"
            getallvideoqurey = "SELECT " + select + " LEFT JOIN tbl_channel as tc ON tc.channel_id = ts.channel_id LEFT JOIN tbl_video as tv ON tv.channel_id = ts.channel_id LEFT JOIN tbl_user as tu ON tu.user_id = tv.user_id " + Wherecondition + ' ORDER BY tv.video_id DESC'
            console.log("Qurey Today =================----> ", getallvideoqurey);
        }
        else if (data.filter == "short") {
            getallvideoqurey = "SELECT " + shortvideoselect + " ts LEFT JOIN tbl_short_video as tsv ON tsv.channel_id = ts.channel_id LEFT JOIN tbl_user as tu On tu.user_id = tsv.user_id LEFT JOIN tbl_channel as tc ON tc.channel_id = ts.channel_id " + Wherecondition
        }
        else if(data.filter == "video"){
            getallvideoqurey = "SELECT " + select + " LEFT JOIN tbl_channel as tc ON tc.channel_id = ts.channel_id LEFT JOIN tbl_video as tv ON tv.channel_id = ts.channel_id LEFT JOIN tbl_user as tu ON tu.user_id = tv.user_id " + Wherecondition + ' ORDER BY tv.video_id DESC'
        }
        let result = await readConnection.select(getallvideoqurey, [user_id])
        return result
    }
}