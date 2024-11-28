import { readConnection } from "../../Config/readDbConnection";
import { CommanDBService } from "../commandbservice";
import { writeConnection } from "../../Config/writeDbConnection";

export class ChannelDBService extends CommanDBService {
    public async cratechannel(data: any): Promise<any> {
        let create_channel_qurey = 'INSERT INTO tbl_channel SET ?'

        let result = await writeConnection.insert(create_channel_qurey, [data]);

        return result
    }
    public async channelcheck(user_id: any): Promise<any> {
        const channel_check = 'SELECT * FROM tbl_channel WHERE user_id = ?'

        let result = await readConnection.select(channel_check, user_id)

        return result
    }
}