import { Request, Response } from "express";
import Razorpay from "razorpay";
import { response } from "../../helper/response";
import { dbservice } from "../../dbservice/dbservice";
import { CookieParser } from "../../Comman/Cookies";
import jwt from "jsonwebtoken"
import { MailServicePremium } from "../../Comman/mail/premium_buy_email";
import { validationResult } from "express-validator";
import { PaymentModel } from "../../Model/Payment/PaymentModel";
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY as string,
    key_secret: process.env.RAZORPAY_SECRETS
})

class Premium {
    
    public async CreatePaymentOrder(req: Request, res: Response): Promise<any> {
        let cookie_decode: any = CookieParser.UserCookie(req)
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return response.setResponse(400, { message: errors.array() }, res, req)
        }
        try {
            let amount: any = 500
            let options: any = {
                amount: amount * 100,
                currency: 'INR'
            }
            razorpay.orders.create(options, async (err: any, order: any) => {
                if (err) {
                    console.log(err)
                    res.send({ data: err })
                }
                else {
                    const payment_payload: PaymentModel = {
                        razorpay_order_id: order.id,
                        payment_amount: parseFloat(amount).toFixed(2),
                        user_id: parseInt(token_decode)
                    }
                    console.log("Order Log = = = == = == >", order);

                    await dbservice.paymentDBservice.payment(payment_payload)
                    console.log("Data  = = = = = = = = = = = = = = = = = = >", await razorpay.orders.fetch(order.id))

                    response.setResponse(200, { message: 'Order Create', payment: payment_payload }, res, req)
                }
            })
        }
        catch (error) {
            console.log("Payment Error =====--->", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }
    }

    public async PaymentVerify(req: Request, res: Response): Promise<any> {
        try {

            let cookie_decode: any = CookieParser.UserCookie(req)
            let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

            let result = await dbservice.paymentDBservice.paymentcheck(parseInt(token_decode))
            console.log("Payment Result Check ======------>", result[0].razorpay_order_id);

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

            console.log("Razorpay Order_Id  = = = = = = = == = >", result[0].razorpay_order_id);

            let cancel_payment = await razorpay.orders.fetchPayments(result[0].razorpay_order_id)

            const razorpay_key: any = process.env.RAZORPAY_SECRETS

            let hmac = crypto.createHmac('sha256', razorpay_key)

            hmac.update(razorpay_order_id + "|" + razorpay_payment_id)

            const genrated_signature = hmac.digest('hex')
            if (!razorpay_payment_id) {
                await dbservice.paymentDBservice.paymentfail(parseInt(token_decode), result[0].payment_id)
                await dbservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), parseInt(result[0].payment_id))
                console.log("Payment Log = = = = = = == = = = = = = = = =>", cancel_payment.items[0])
                return response.setResponse(402, { message: `${cancel_payment.items[0].error_description}` }, res, req)
            }
            if (razorpay_signature == genrated_signature) {

                let payment_capture = await razorpay.payments.capture(razorpay_payment_id, 50000, "INR")
                if (payment_capture?.id) {

                    let payment_order = await razorpay.orders.fetch(razorpay_order_id)
                    let payment = await razorpay.payments.fetch(payment_capture.id)

                    if (payment_order.status == 'paid' && payment.status == 'captured') {
                        await dbservice.paymentDBservice.paymentcomplate(parseInt(token_decode), result[0].payment_id)
                        let checkUser = await dbservice.userDBservice.finduser(token_decode)
                        MailServicePremium(checkUser.email, checkUser.username, checkUser.user_profile)
                    }
                    else {
                        await dbservice.paymentDBservice.paymentfail(parseInt(token_decode), result[0].payment_id)
                        await dbservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), parseInt(result[0].payment_id))
                        response.setResponse(402, { message: 'Payment Fail...' }, res, req)
                    }
                }
                response.setResponse(200, { message: 'Payment Verify...' }, res, req)
            }
            else {
                response.setResponse(400, { message: 'Payment Fail....' }, res, req)
                await dbservice.paymentDBservice.paymentfail(parseInt(token_decode), result[0].payment_id)
                await dbservice.paymentDBservice.cancelpayment(cancel_payment.items[0].error_description, parseInt(token_decode), parseInt(result[0].payment_id))
            }
        } catch (error) {

            console.log("Payment Error ====>", error);
            response.setResponse(500, { message: 'Internal Server Error...' }, res, req)
        }

    }

    public async PaymentHistory(req: Request, res: Response): Promise<any> {

        let data = req.query
        let cookie_decode: any = CookieParser.UserCookie(req)
        let token_decode: any = jwt.verify(cookie_decode, process.env.JWT_KEY as string)

        let result = await dbservice.paymentDBservice.paymenthistory(parseInt(token_decode), data)

        if (result.length > 0) {
            return response.setResponse(200, { message: 'Success', payment_history: result }, res, req)
        }
        else {
            response.setResponse(404, { message: 'Payment History Is Emptyz' }, res, req)
        }
    }
}

export const login_page = (req: Request, res: Response) => {

    res.render('login')
}
export const paremium_buy_page = (req: Request, res: Response) => {

    res.render('premium')
}
export const payment = new Premium()