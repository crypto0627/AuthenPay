'use client'

import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useMe } from '@/providers/Me'

export function UserBalance({ address }: { address: Address }) {
  const { balance, isLoading } = useMe()
  const [totalBalance, setTotalBalance] = useState<number>(0)

  const now = new Date() // current date
  const date = new Date(now.getTime() + 8 * 60 * 60 * 1000)

  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    const fetchBalance = async () => {
      if (balance) {
        let sum = 0
        Object.values(balance).forEach((value) => {
          sum += value
        })
        setTotalBalance(sum)
      }
    }
    fetchBalance()
  }, [balance])

  return (
    <div className="w-[330px] h-[150px] rounded-[20px] glass p-6 text-black flex items-center">
      <div className="w-full flex flex-col gap-3">
        <div className="text-sm">{formatted}</div>
        <div className="w-full flex items-end justify-end text-4xl">
          <div>
            {isLoading ? (
              <div className="h-[20px] flex items-center pb-2">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-blue-200 animate-spin fill-blue-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              `$${totalBalance < 1000000 ? totalBalance.toFixed(2) : totalBalance.toFixed(0)}`
            )}
          </div>
          <div className="text-xl ml-[12px]">USDC</div>
        </div>
        <div className="text-sm">Total balance</div>
      </div>
    </div>
  )
}
