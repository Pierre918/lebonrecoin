import Link from 'next/link'
import React from 'react'
import MyButton from './MyButton'

const HeaderNotConnected = () => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <Link href={"/"}>
        <h1 className='text-4xl violet newsreader-title'><b>lebonrecoin</b></h1>
        </Link>
        <div className="">
            <Link href="/sign-up" className='mr-2'>Sign up</Link>
            <Link href="/login">
            <MyButton text="Login" ></MyButton>
            </Link>
        </div>
        
    </div>
  )
}

export default HeaderNotConnected