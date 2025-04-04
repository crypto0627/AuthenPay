'use client'
import styles from '@/app/style'
import { github } from '../assets'
import Image from 'next/image'

export default function Footer() {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexCenter} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex flex-col justify-start mr-10 items-center">
        <div className="flex flex-row items-center text-center">
        <Image src="/logo.png" alt="Authenpay" width={60} height={60} />
            <h1 className="text-2xl font-bold">AuthenPay</h1>
          </div>
          <p className={`${styles.paragraph} mt-4`}>
            An USDC cross-chain payment app that does not require a wallet.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2025 AuthenPay. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          <a href='https://www.github.com/authenpay' target='_blank'>
            <Image src={github} alt='github' width={21} height={21} />
          </a>
        </div>
      </div>
    </section>
  )
}
