export interface PaymentModel { 
    razorpay_order_id:string,
    payment_amount:string,
    user_id:number
}

export interface PaymentVerifyModel{
    user_id : number,
    payment_id:number
}
