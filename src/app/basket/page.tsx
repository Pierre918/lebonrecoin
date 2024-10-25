import React from 'react'
import SubHeader from '../components/ui/SubHeader'
import { cookies } from 'next/headers'
import { getItem } from '../actions';
import Image from 'next/image';
import MyButton from '../components/ui/MyButton';


const page = async () => {
    
    let ids: string[] = []; 
    let item:any[]=[];
    const cookieStore = await cookies()
    let price=0;
    if (cookieStore.has('cart')) {
        ids = cookieStore.get('cart')!.value.split(" ")
        for (let i=0;i<ids.length;i++){4
            item.push(await getItem(Number(ids[i])))
        }
        for (let i=0;i<item.length;i++){4
            price+=item[i][0]["price"]
        }
    }

    return (
        <>
            <SubHeader title="Your Basket" show_filter={false} />
            <div className="grid grid-rows-1 gap-5">
                {
                    item.map(
                        (it,index)=>{
                            return <div className="w-full flex flex-row" key={index}>
                                <Image
                                src={it[0]['item_images'][0]["image_url"]}
                                className='rounded-lg'
                                alt=""
                                width={150}
                                height={150}
                                ></Image>
                                <div className="flex flex-col ml-4">
                                <h3 className='text-xl font-bold'>{it[0]["title"]}</h3>
                                <p className='text-green-700'>{it[0]["price"]} $</p>
                                <p className='text-gray-700 text-opacity-50'>{it[0]["description"]}</p>
                                </div>
                            </div>}
                    )
                }
            </div>
            <div className="mt-7">
                <p className='text-3xl font-bold'>Prix total : {`${price}`} $</p>
            </div>
            <MyButton text="J'achète" item={item} price={price}></MyButton>
        </>
    )
}

export default page