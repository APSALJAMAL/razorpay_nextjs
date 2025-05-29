
import { neon } from '@neondatabase/serverless';

type BillInfoType = {
    id: number,
    name: string,
    email: string,
    phone: string,
    notes: string,
    price: number,
    product: string,
    status: string
};

export async function getDataForId(id:number): Promise<BillInfoType | null> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql`SELECT * FROM bill_info WHERE id = ${id}` as  BillInfoType[];
    if(data.length) {
        return data[0];
    }
    return null;
}

export async function updateStatusDone(id: number) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql`UPDATE bill_info SET status = 'done' WHERE id = ${id}`;
    return data;
}

export async function addOrderId(id: number, orderId:string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const data = await sql`UPDATE bill_info SET notes = ${orderId} WHERE id = ${id}`;
    return data;
}


