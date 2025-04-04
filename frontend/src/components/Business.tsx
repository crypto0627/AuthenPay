import { featureTypes } from '@/types/ui.type'
import { features } from '@/constants'
import styles, { layout } from '@/app/style'
import Button from '@/components/Button'
import Link from 'next/link'
import Image from 'next/image'

export function FeatureCard(props: featureTypes) {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${props.index !== features.length - 1 ? 'mb-6' : 'mb-0'} feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <Image
          src={props.icon}
          alt="star"
          className="object-contain"
          width={64}
          height={64}
        />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
          {props.title}
        </h4>
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
          {props.content}
        </p>
      </div>
    </div>
  )
}

export default function Business() {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          We make USDC payments simple
        </h2>
      </div>

      <div className={`${layout.sectionImg} flex-col items-left`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  )
}
