'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Copy,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { tapToCopy, formatAddress } from '@/utils'
import { useMe } from '@/providers/Me'

export default function Receive() {
  const { address } = useMe()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [chain, setChain] = useState<
    'base' | 'eth' | 'ava' | 'polygon' | 'arb'
  >('base')
  const [copied, setCopied] = useState(false)
  const [receiver, setReceiver] = useState<string>('')
  const [amount, setAmount] = useState<number | ''>()
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  const chainOptions = [
    { value: 'base', label: 'Base' },
    { value: 'eth', label: 'Ethereum' },
    { value: 'ava', label: 'Avalanche' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'arb', label: 'Arbitrum' },
  ]

  const handleCopy = () => {
    tapToCopy(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative py-6 flex flex-col items-center gap-4">
      <div
        className="absolute w-[48px] h-[48px] left-4 top-6 cursor-pointer"
        onClick={() => {
          router.push('/home')
        }}
      >
        <ChevronLeftIcon className="w-8 h-8 text-gray-400" />
      </div>
      <div className="text-black text-2xl text-center">Receive USDC</div>
      <div className="flex flex-col items-center justify-center gap-4">
        {isConfirm ? (
          <div className="flex flex-col w-full h-full p-4 items-center bg-gray-200 gap-2 rounded-xl">
            <div className="w-[300px] h-[300px]">
              <QRCodeSVG
                value={`https://authen-pay.vercel.app/send?chain=${chain}&receiver=${address}&amount=${amount}`}
                size={300}
              />
            </div>
            <div className="text-gray-400 text-sm">
              Scan the QR code to receive USDC
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 my-4 items-center">
            <div
              className="p-[2px] rounded-[12px] border border-white w-[300px]"
              style={{
                background:
                  'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)',
              }}
            >
              <div className="relative">
                <div
                  className="px-4 py-2 text-black bg-gray-200/20 rounded-[10px] w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>
                    {
                      chainOptions.find((option) => option.value === chain)
                        ?.label
                    }
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </div>
                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[10px] shadow-lg z-10 text-black">
                    {chainOptions.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-[10px] last:rounded-b-[10px]"
                        onClick={() => {
                          setChain(option.value as any)
                          setIsOpen(false)
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="p-[2px] rounded-[12px] border border-white w-[300px]"
              style={{
                background:
                  'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)',
              }}
            >
              <input
                className="px-4 py-2 text-black bg-gray-200/20 rounded-[10px] w-full"
                value={amount}
                type="number"
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    setAmount(Number(e.target.value))
                  } else {
                    setAmount('')
                  }
                }}
                placeholder="Amount"
              />
            </div>
            <button
              className="px-6 py-3 text-black cursor-pointer button-35 w-[120px]"
              onClick={() => {
                if (typeof amount == 'number') {
                  setIsConfirm(true)
                }
              }}
            >
              Comfirm
            </button>
          </div>
        )}
        {isConfirm && (
          <div className="w-full flex flex-col items-center">
            <button
              className="px-6 py-2 text-black cursor-pointer button-35 w-[180px]"
              onClick={() => {
                setIsConfirm(false)
              }}
            >
              Edit
            </button>
          </div>
        )}
        <div
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={handleCopy}
        >
          <span className="text-blue-600 font-medium">
            {formatAddress(address)}
          </span>
          <Copy className="w-4 h-4 text-blue-600" />
          {copied && (
            <span className="text-green-500 text-sm ml-2">Copied!</span>
          )}
        </div>
      </div>
    </div>
  )
}
