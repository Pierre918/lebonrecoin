"use client"
import React from 'react'
import SubHeader from "./SubHeader";
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

interface param {
  localisations?: string[],
  itemList: any[]
}
const ListItem: React.FC<param> = ({ localisations, itemList }) => {
  const [itemListUp, setItemListUp] = useState<any[]>(itemList)
  return (
    <>
      <SubHeader title="Produce" show_filter={true} localisations={localisations} onUpdate={setItemListUp} allItems={itemList}></SubHeader>
      <div className='grid grid-cols-4 justify-around gap-x-10'>
        {
          itemListUp.map(
            (item) => {
              return <Link href={`/produit/${item.id}`} key={item.id} >
                <div className='rounded-lg space-y-1 pb-1  border-gray-400 bg-gray-100 flex flex-col'>
                  <Image
                    src={item["item_images"][0]["image_url"]}
                    className='rounded-t-lg mb-1 w-fit'
                    alt=""
                    width={275}
                    height={275}
                  />
                  <div className="flex flex-col pl-2">
                    <p><b>{item["title"]}</b></p>
                    <p className='text-green-700'>{item["price"]} $</p>
                    <p className='text-gray-700 text-opacity-50'>{item["description"]}</p>
                  </div>
                </div>
              </Link>
            }
          )
        }
      </div>
    </>
  )
}

export default ListItem