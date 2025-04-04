'use client'

import { useState } from 'react'
import { close, menu } from '../assets'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [active, setActive] = useState<string>('Home')
  const [toggle, setToggle] = useState<boolean>(false)
  
  const navLinks = [
    {"id": "home", "title": "Home", "link": "/"},
    {"id": "github", "title": "Github", "link": "https://www.github.com/authenpay"},
    {"id": "launch", "title": "Launch App", "link": "/launch"},
  ]

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex flex-row items-center text-center">
        <Image src="/logo.png" alt="Authenpay" width={60} height={60} />
        <h1 className="text-2xl font-bold">AuthenPay</h1>
      </div>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? 'text-white' : 'text-dimWhite'
            } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
          >
            <Link href={nav.link}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <button
          className="bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="object-contain"
            width={28}
            height={28}
          />
        </button>

        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
              >
                {index === 0 && (
                  <Link href={`#${nav.id}`} onClick={() => setActive(nav.title)}>
                    {nav.title}
                  </Link>
                )}
                {index === 1 && (
                  <a href="https://github.com/hollow-leaf/psyduck" target="_blank">
                    {nav.title}
                  </a>
                )}
                {index === 2 && (
                  <Link href="/launch">
                    {nav.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
