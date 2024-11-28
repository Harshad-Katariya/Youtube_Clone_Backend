import { CommanDBService } from "../commandbservice";
import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection";

export class UserDBService extends CommanDBService {
    public async createUser(data: any): Promise<any> {
        const insert_qurey = 'INSERT INTO tbl_user SET ?'

        let result = await writeConnection.insert(insert_qurey, [data]);

        return result
    }
    public async checkUser(email: any): Promise<any> {
        const insert_qurey = 'SELECT * FROM tbl_user WHERE email = ? '
        let result = await readConnection.select(insert_qurey, [email]);

        return result[0]
    }
    public async finduser (user_id:number): Promise<any>{
         const user_qurey = 'SELECT * FROM tbl_user WHERE user_id = ?'

         let result = await readConnection.select(user_qurey,[user_id])

         return result[0]
    }
    public async findemail(user_id: number): Promise<any> {
        const email_qurey = `SELECT tu.user_id,tu.email,tu.user_profile FROM tbl_channel as tc LEFT JOIN tbl_user as tu ON tu.user_id = tc.user_id WHERE tc.user_id = ?`

        let result = await readConnection.select(email_qurey, [user_id])

        return result
    }
    public async deleteuserupdate(user_id: any): Promise<any> {
        let set =
        {
            is_active: 0,
            is_deleted: 1
        }

        const delete_user_update_qurey = 'UPDATE tbl_user SET ? WHERE user_id = ? AND is_active=1 AND is_deleted=0'
        let result = await writeConnection.delete(delete_user_update_qurey, [set, user_id])
        return result.affectedRows > 0 ? true : false
    }
}

