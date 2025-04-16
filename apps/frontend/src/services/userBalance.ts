import { chainNameMapAPI } from '@/utils'

export const userBalanceData = async (
  userAddress: string,
): Promise<Record<string, number>> => {
  try {
    const response = await fetch(
      'https://alchemy-api.jake0627a1.workers.dev/balance',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: userAddress,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch balance data')
    }

    const rawdata = await response.json()

    const balanceRcord: Record<string, number> = {}

    rawdata.forEach((cb: any) => {
      balanceRcord[chainNameMapAPI[cb.chain]] = cb.balance
    })

    return balanceRcord
  } catch (error) {
    console.error('Error fetching balance:', error)
    return {}
  }
}
