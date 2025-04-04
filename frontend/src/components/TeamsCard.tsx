import { teamTypes } from '@/types/ui.type'
import Image from 'next/image'

export default function TeamsCard(props: teamTypes) {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
      <div className="flex flex-row">
        <Image
          src={props.img}
          alt={props.name}
          className="rounded-full"
          width={60}
          height={60}
        />
        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
            {props.name}
          </h4>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
            {props.title}
          </p>
        </div>
      </div>
    </div>
  )
}
