'use client';

import { useRouter } from "next/navigation";
import { onPay, verifyPayment, type RazorpayResponseType } from "./razorpay-server-action";

export default function PayButton({id}: {id: number}) {
    const router = useRouter();
    return (
        <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
                console.log('I am on client');
                const ret = await onPay(id);
                console.log('IN CLIENT', ret);

                const options = {
                    key: ret?.key,
                    amount: ret?.amount,
                    currency: 'INR',
                    name: 'REPULSO',
                    description: ret?.description,
                    order_id: ret?.orderId,
                    prefill: {
                        contact: ret?.phone,
                    },
                    theme: {
                        color: "#00ffbb",
                    },
                    handler: async function (obj: RazorpayResponseType) {

                        // console.log('SUCCESS', obj);
                        const result = await verifyPayment(id, obj);
                        if(result) {
                            router.refresh();
                        }
                    }
                };

                // @ts-expect-error This is razorpay direct javascript calls. So ignoreing lints.
                const rzp = new window.Razorpay(options);
                rzp.open();
            }}
        >
            Pay
        </button>
    );
}
