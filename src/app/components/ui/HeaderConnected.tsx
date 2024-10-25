import Link from 'next/link'
import React from 'react'
import MyButton from './MyButton'

const HeaderConnected = () => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <Link href={"/"}>
        <h1 className='text-4xl violet newsreader-title'><b>lebonrecoin</b></h1>
        </Link>
        <div className="">
            <Link href="/my-profile" className='mr-2'>My profile</Link>
            <Link href="/basket">
            <MyButton text="Basket" ></MyButton>
            </Link>
        </div>
        
    </div>
  )
}

export default HeaderConnected