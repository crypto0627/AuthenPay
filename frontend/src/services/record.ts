import { TransactionRecord } from "@/types/record";
import { Address } from "viem";

const HOST = "https://chat.boringchats.xyz"
//const HOST = "http://127.0.0.1:5001"

console.log(HOST)
export const storeRecord = async (record: TransactionRecord): Promise<boolean> => {
    try {
        const response = await fetch(HOST + "/address/record/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                record
            }),
        });

        console.log(response)

        return true
    } catch (error) {
        console.error('Error fetching balance:', error);
        return false
    }
}

export const record = async (address: Address): Promise<TransactionRecord[]> => {
    try {
        const response = await fetch(HOST + `/address/record/${address}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res = await response.json()

        console.log(res)

        return res
    } catch (error) {
        console.error('Error fetching balance:', error);
        return []
    }
}