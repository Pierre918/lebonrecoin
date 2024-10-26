"use client"
import React from 'react'

import { delItem } from '../../actions';

interface MyButtonProps{
    text: string
    formAction?: ((formData: FormData) => void | Promise<void>) 
    className?:string ,
    onClick?: () => void | undefined,
    item?:any[],
    price?:number
}

const MyButton: React.FC<MyButtonProps> = ({ text,formAction, className,item,price }) => {
  return (
   <button onClick={()=>{ if (item && price) { delItem(item,price,true); } }} className={`rounded-md px-3 py-1 border my-bg ${className}`} formAction={formAction ? formAction : undefined}  >
        <p className="blanc">{text}</p>
    </button>
    
  )
}

export default MyButton