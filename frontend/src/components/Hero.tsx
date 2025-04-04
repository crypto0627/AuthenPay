import React from 'react'
import styles from '@/app/style'
import { streamer } from '@/assets'
import GetStarted from '@/components/GetStarted'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" />{' '}
            <span className="text-gradient">USDC</span>{' '}
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Payment Wallet
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Provides Web2 app-like operations to trade USDC across chains, allowing users to easily send, receive, and exchange USDC between Base, Ethereum, and Avalanche.
        </p>
      </div>

      <Link href="/launch" className="lg:flex hidden md:mr-4 mr-0">
        <GetStarted />
      </Link>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-1 my-10 relative`}
      >
        <Image
          src="/hero.png"
          alt="hero"
          className="w-[100%] h-[90%] relative z-[6]"
          width={1000}
          height={1000}
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[45%] h-[40%] top-0 left-0 blue__gradient animate-pulse" />
        <div className="absolute z-[1] w-[85%] h-[85%] rounded-full white__gradient bottom-40 opacity-70 blur-xl" />
        <div className="absolute z-[0] w-[55%] h-[55%] right-20 bottom-20 blue__gradient animate-float" />
        <div className="absolute z-[2] w-[30%] h-[30%] left-20 top-40 purple__gradient opacity-60" />
        <div className="absolute z-[1] w-[25%] h-[25%] right-10 top-10 yellow__gradient animate-pulse" />
        {/* gradient end */}
      </div>
    </section>
  )
}
