'use server';

import Razorpay from "razorpay";
import { addOrderId, getDataForId, updateStatusDone } from "../db";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY ?? '',
    key_secret: process.env.RAZORPAY_SECRET ?? '', 
});

export type RazorpayResponseType = {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
};

export async function onPay(id: number) {
    console.log('I am on server', id);

    const data = await getDataForId(id);

    if(!data?.price) {
        return null;
    }

    const options = {
        amount: data.price * 100,
        currency: 'INR',
        receipt: data.product
    }

    const order = await razorpay.orders.create(options);

    await addOrderId(id, order.id);

    return {
        orderId: order.id,
        amount: order.amount,
        name: data.name,
        email: data.email,
        phone: data.phone,
        description: data.product,
        key: process.env.RAZORPAY_KEY ?? '',
    }
    
}

export async function verifyPayment(id: number, obj: RazorpayResponseType) {

    const data = await getDataForId(id);
    if(data?.notes !== obj.razorpay_order_id) {
        console.log('Order id not matching');
        return null;
    }

    const isValidSignature = validateWebhookSignature(
        `${obj.razorpay_order_id}|${obj.razorpay_payment_id}`,
        obj.razorpay_signature,
        process.env.RAZORPAY_SECRET ?? ''
    );

    if(isValidSignature) {
        await updateStatusDone(id);
    }

    return isValidSignature;

}



