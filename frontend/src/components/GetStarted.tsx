import { arrowUp } from '@/assets'
import Image from 'next/image'

export default function GetStarted() {
  return (
    <div className="flex justify-center items-center w-[140px] h-[140px] rounded-full p-[2px] border-2 border-white/20 cursor-pointer mx-auto hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center items-center flex-col bg-primary w-full h-full rounded-full shadow-lg">
        <div className="flex justify-center items-center flex-row">
          <p className="font-poppins font-medium text-[18px] leading-[23.4px] mr-1">
            <span className="text-gradient">Get</span>
          </p>
          <Image
            src={arrowUp}
            alt="arrow-up"
            className="object-contain animate-bounce"
            width={23}
            height={23}
          />
        </div>

        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </div>
  )
}
