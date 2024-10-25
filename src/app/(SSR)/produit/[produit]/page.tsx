import React from 'react'
import SubHeader from '../../../components/ui/SubHeader'
import { getItem, handleFormAddItem } from '../../../actions'
import Image from 'next/image'
import MyButton from '@/app/components/ui/MyButton'


interface Params{
  params:{produit:string}
}



const page = async ({params}:Params) => {
  
    const {produit}=await params
    const item:any[] =(await getItem(Number(produit)))
  return (
    <>
        <SubHeader show_filter={false} title={item[0]["title"]}></SubHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row">
            <Image 
              src={item[0]["item_images"][0]["image_url"]}
              width={350}
              height={350}
              alt=""
              className='rounded-lg'
            />
            <form className="flex flex-col ml-3">
              <p>{item[0]["price"]} $</p>
              <p className='text-gray-700 text-opacity-50'>{item[0]["description"]}</p>
              <input name="id" id="id" type="text" readOnly style={{display:"none"}} value={item[0]["id"]} />
              <MyButton text="Buy"  formAction={handleFormAddItem}/>
            </form>
          </div>
          <div className="flex flex-col">
            <h2 className='text-lg font-bold'>Vendeur :</h2>
            <p><b>{item[0]["users"]["name"]}</b></p>
            <p>{item[0]["users"]["adress"]}</p>
          </div>
        </div>
    </>
  )
}

export default page