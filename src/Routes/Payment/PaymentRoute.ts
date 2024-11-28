import { Router } from "express";
import { IS_Verify } from "../../Middleware/Is_Verify";
import { paremium_buy_page, payment } from "../../Controller/Payment/Payment";

const paymentvalidator = require('../../Validator/Payment/PremiumValidator')

class PaymentRoute{
    public route: Router = Router()

    constructor() {
        this.config()
    }
    config(){
        this.route.post('/order',IS_Verify.is_verify_user,payment.CreatePaymentOrder)
        this.route.get('/order',paremium_buy_page)
        this.route.post('/verify-paymnet',IS_Verify.is_verify_user, payment.PaymentVerify)
        this.route.get('/payment-history',IS_Verify.is_verify_user, payment.PaymentHistory)
    }
}

const paymentroute = new PaymentRoute()
export default paymentroute.route