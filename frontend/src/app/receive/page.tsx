"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { ChevronLeftIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Receive() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [chain, setChain] = useState<'base' | 'eth' | 'ava' | 'polygon' | 'arb'>('base')
    
    const chainOptions = [
        { value: 'base', label: 'Base' },
        { value: 'eth', label: 'Ethereum' },
        { value: 'ava', label: 'Avalanche' },
        { value: 'polygon', label: 'Polygon' },
        { value: 'arb', label: 'Arbitrum' }
    ]

    return (
        <div className="relative py-6 flex flex-col items-center gap-4">
            <div
                className="absolute w-[48px] h-[48px] left-4 top-6 cursor-pointer"
                onClick={() => {
                    router.push('/home');
                }}
            >
                <ChevronLeftIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-black text-2xl text-center">
                Receive USDC
            </div>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='p-4 w-[200px] h-[50px] bg-gray-200/50 rounded-xl'>
                    <div className='flex flex-row items-center justify-center relative w-full cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                        <span className='text-black font-medium'>
                            {chainOptions.find(option => option.value === chain)?.label}
                        </span>
                        <div className='absolute right-0'>
                            {isOpen ? <ChevronUpIcon className='w-4 h-4 text-gray-400' /> : <ChevronDownIcon className='w-4 h-4 text-gray-400' />}
                        </div>
                    </div>
                    {isOpen && (
                        <div className='absolute mt-2 w-[200px] bg-white shadow-lg rounded-xl z-10'>
                            {chainOptions.map((option) => (
                                <div 
                                    key={option.value} 
                                    className='py-2 hover:bg-gray-100 cursor-pointer text-black text-center'
                                    onClick={() => {
                                        setChain(option.value as any);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-full h-full p-4 items-center bg-gray-200 gap-2 rounded-xl'>
                    <div className='w-[300px] h-[300px]'>
                        <QRCodeSVG value={`/${chain}`} size={300} />
                    </div>
                    <div className='text-gray-400 text-sm'>
                        Scan the QR code to receive USDC
                    </div>
                </div>
            </div>
        </div>
    )
}