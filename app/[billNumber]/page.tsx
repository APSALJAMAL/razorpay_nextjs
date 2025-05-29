import Script from "next/script";
import { getDataForId } from "../db";
import PayButton from "../razorpay/PayButton";

type Props = {
    params: {
        billNumber: string
    }
}

export default async function BillPage({params}: Props) {

    const { billNumber } = await params;

    const bill = await getDataForId(Number(billNumber) || 0);

    if (!bill) {
        return (
          <div className="flex justify-center items-center py-10 bg-gray-100">
            <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-red-100">
              <div className="font-bold text-xl mb-2 text-red-700">Error</div>
              <p className="text-red-700 text-base">
                Bill information is not available.
              </p>
            </div>
          </div>
        );
    }
    
    return (
        <div className="justify-center grid py-10">
            <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
            <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white grid content-center w-100">
                <div className="font-bold text-xl text-black mb-2">{bill.product}</div>
                <p className="text-black text-base">
                    Name: {bill.name}
                </p>
                <p className="text-black text-base">
                    Email: {bill.email}
                </p>
                <p className="text-black text-base">
                    Phone: {bill.phone}
                </p>
                <p className="text-black text-base">
  Amount: ₹{Number(bill.price).toFixed(2)}
</p>

                {bill.status === 'pending' && <PayButton id={bill.id}/>}
                {bill.status === 'done' && <div className="p-2 bg-emerald-600 rounded text-white mt-2">Paid</div>}
                
            </div>
        </div>
    );
}
