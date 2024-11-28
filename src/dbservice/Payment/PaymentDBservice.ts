import { readConnection } from "../../Config/readDbConnection";
import { writeConnection } from "../../Config/writeDbConnection"
import { CommanDBService } from "../commandbservice"

export class Payment extends CommanDBService {
    public async payment (data: any): Promise<any> {

        let payment_qurey = `INSERT INTO tbl_payment SET ?`;

        let result = await writeConnection.insert(payment_qurey, [data])

        return result
    }

    public async paymentcheck (user_id:number): Promise<any>{

        let payment_check = `SELECT * FROM tbl_payment WHERE user_id = ? ORDER BY payment_id DESC LIMIT 1`

        let result = await readConnection.select(payment_check,[user_id])

        return result
    }

    public async paymentcomplate (user_id: any,payment_id:number): Promise<any> {
        let premium_complate_qurey = 'UPDATE tbl_payment SET payment_status = "complate",premium_expire = DATE_ADD(NOW(), INTERVAL 1 MONTH) WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(premium_complate_qurey, [user_id,payment_id])

        return result
    }

    public async paymentfail (user_id:number,payment_id:number): Promise<any>{

        let payment_fail_qurey = 'UPDATE tbl_payment SET payment_status = "fail" WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(payment_fail_qurey,[user_id,payment_id])

        return result
    }

    public async cancelpayment (cancel_payment:any,user_id:number,payment_id:number): Promise<any>{

        let cancel_payment_reason_qurey = 'UPDATE tbl_payment SET cancel_reason = ? WHERE user_id = ? AND payment_id = ?'

        let result = await writeConnection.update(cancel_payment_reason_qurey,[cancel_payment,user_id,payment_id])

        return result
    }

    public async paymenthistory (user_id:number,data:any): Promise<any>{

        let payment_history = `SELECT * FROM tbl_payment WHERE user_id = ?`

        if(data.filter=='complate'){

            payment_history += ' AND payment_status="complate"'
        }
        else if(data.filter=='fail'){
            payment_history += ' AND payment_status="fail"'
        }
        else if(data.filter=='processing'){
            payment_history += ' AND payment_status="processing"'
        }
        else{
            payment_history
        }
        let result = await readConnection.select(payment_history,[user_id])
        
        return result
    }
}
// UPDATE tbl_user SET is_premium = 0,premium_expire_at = null WHERE user_id = ? OR premium_expire_at < NOW();