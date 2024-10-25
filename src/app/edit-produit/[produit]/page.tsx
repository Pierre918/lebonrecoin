"use client"
import { addItem, editItem, getItem } from '@/app/actions'
import MyButton from '@/app/components/ui/MyButton'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Params{
    params:{produit:string}
  }
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

const page = ({params}:Params) => {
    const [imageItem , setImageItem] = useState<string>('')
    const setUp= async ({params}:Params)=>{
        const {produit}=await params
        const item = await getItem(Number(produit))
        setImageItem((item[0]["item_images"][0]["image_url"]))
        return item
    }
    const [item, setItem] = useState<any[]>()
    useEffect(()=>{
        setUp({params}).then(result=>
            setItem(result)
        )
      },[])
  return (
    <>
<div className="flex w-full flex-col mt-4 space-y-5 ">
                <h3 className='text-2xl'>Edit item's info</h3>
                {item?<form className={`flex flex-row w-full space-x-5`} name="additem">
                    <input type="text" name="item_id" id="item_id" defaultValue={item[0]["id"]} className='hidden'/>
                    <div className="flex flex-col space-y-2 ">
                        <label htmlFor="name">Item's name</label>
                        <input id="name" name="name" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder="Mon nouveau bob" defaultValue={item[0]["title"]} required />
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder='40k mgl' defaultValue={item[0]["price"]} type="number" required />
                        <label htmlFor="description">Description</label>
                        <input id="description" defaultValue={item[0]["description"]} name="description" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder="bob de fou fr" required />

                        <div className="w-44 pt-7">
                            <MyButton text='Edit' formAction={editItem} className='text-xl w-20' ></MyButton>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className='mb-3'>Edit picture</p>
                        <label htmlFor="image" className=' transition duration-300 hover:scale-110 rounded-md border w-24 h-16 justify-center flex items-center'>
                            <Image
                            className='rounded-lg'
                            src={imageItem}
                            width={100}
                            height={100}
                            alt=""
                            />
                        </label>
                        <input type="text" className='hidden' name="base64image" id="base64image" value={imageItem} onChange={()=>{}}/>
                        <input type="file" name="image" id="image" style={{display:"none"}} onChange={async (event)=>{
                            if (event.target.files?.length){
                            alert("Bien reçu mon chef")
                              
                                setImageItem((await toBase64(event.target.files[0])) as string)
                            }
                        }} />
                    </div>
                    <input type="text" className='hidden' name="base64image" id="base64image" value={imageItem} onChange={()=>{}}/>
                </form>:
                <div className="flex items-center justify-center">
                <svg className="animate-spin h-12 w-12 text-custom" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="80" strokeDashoffset="40" strokeLinecap="round" />
                </svg>
              </div>
              }
                
<img></img>
            </div>
    
    </>
  )
}

export default page