"use client"
import React, { useState } from 'react'
import MyButton from './MyButton'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addItem } from '@/app/actions'

// Convert a file to base64 string
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

const ItemForm = () => {
    const [imageItem , setImageItem] = useState<string>('')

  return (
    <>
    <div className="flex w-full flex-col mt-4 space-y-5 ">
                <h3 className='text-2xl'>Edit your info</h3>
                <form className='flex flex-row w-full space-x-5' name="additem">
                    <div className="flex flex-col space-y-2 ">
                        <label htmlFor="name">Item's name</label>
                        <input id="name" name="name" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder="Mon nouveau bob" required />
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder='40k mgl' type="number" required />
                        <label htmlFor="description">Description</label>
                        <input id="description" name="description" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' placeholder="bob de fou fr" required />

                        <div className="w-44 pt-7">
                            <MyButton text='Edit' formAction={addItem} className='text-xl w-20' ></MyButton>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p>Add a picture</p>
                        <label htmlFor="image" className=' transition duration-300 hover:scale-110 rounded-md border w-24 h-16  my-bg justify-center flex items-center'><p className='text-4xl blanc'>+</p></label>
                        <input type="file" name="image" id="image" style={{display:"none"}} onChange={async (event)=>{
                            if (event.target.files?.length){
                            alert("Bien reçu mon chef")
                              
                                setImageItem((await toBase64(event.target.files[0])) as string)
                                console.log(imageItem)
                            }
                        }} />
                    </div>
                    <input type="text" className='hidden' name="base64image" id="base64image" value={imageItem} onChange={()=>{}}/>
                </form>

            </div>
    
                        </>
  )
}

export default ItemForm