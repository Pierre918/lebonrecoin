"use server"
import React from 'react'
import SubHeader from '../components/ui/SubHeader'
import { createClient } from '@/utils/supabase/server'
import { delOneItem, editUser, getUserItems } from '../actions'
import { redirect } from 'next/navigation'
import MyButton from '../components/ui/MyButton'
import Link from 'next/link'
import Image from 'next/image'
import 'material-icons/iconfont/material-icons.css';
import DeleteButton from '../components/ui/DeleteButton'
import { User } from '@supabase/supabase-js'
const page = async () => {
    let name_user;
    let user:User;
    let user_address;
    const supabase = await createClient();
    try {

        user = (await supabase.auth.getUser())["data"]["user"]!

        const { data } = await supabase
            .from('users')
            .select("name,adress")
            .eq("user_id", user["id"])
        if (data == null || (typeof data == 'undefined')) {
            redirect("/error")
        }
        name_user = data[0]["name"]
        user_address = data[0]["adress"]
    } catch (error) {
        console.log(error)
        redirect("/error")
    }

    //get user item : 
    let userItems: any = [];
    try {
        userItems = await getUserItems(user)
    } catch (error) {
        console.log(error)
        redirect("/error")
    }
    return (
        <>
            <SubHeader title={`Hello ${name_user}`} show_filter={false}></SubHeader>
            <div className="flex flex-row ">
                <div className="flex w-full flex-col mt-4 space-y-5 ">
                    <h3 className='text-2xl'>Edit your info</h3>
                    <form className='flex flex-col space-y-2'>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' defaultValue={user["email"]} required />
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' type="password" defaultValue='123456' required />
                        <label htmlFor="nom">Nom</label>
                        <input id="nom" name="nom" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' defaultValue={name_user} required />
                        <label htmlFor="adresse">Adresse</label>
                        <input id="adresse" name="adresse" type="text" className='w-72 h-12 p-3 rounded border border-black bg-gray-100' defaultValue={user_address} required />
                        <div className="w-44 pt-7">
                            <MyButton formAction={editUser} text='Edit' className='text-xl w-20' ></MyButton>
                        </div></form>
                </div>
                <div className="flex w-full flex-col mt-4 space-y-5">
                    <h3 className='text-2xl'>Item à vendre</h3>

                    
                        <ul className='flex flex-col space-y-5'>
                            {
                                userItems.map((userItem: any, index: number) => {
                                   
                                      return  <li className="flex flex-row justify-between" key={index}>
                                           <div className="flex flex-row space-x-3 ">
                                            <Image
                                                src={userItem["image_url"]}
                                                alt="produit"
                                                width={200}
                                                height={200}
                                                className='rounded-xl'
                                            />
                                            <div className="flex flex-col">
                                                <h3 className='text-xl'><b>{userItem["title"]}</b></h3>
                                                <p className='text-green-700'><b>{userItem["price"]}</b></p>
                                                <p className='text-gray-500'>{userItem["description"]}</p>
                                            </div>
                                            </div>
                                            <div className={`flex flex-col justify-center space-y-3 `+userItem?"":"hidden"}>
                                            <Link href={`/edit-produit/${userItem["id"]}`}>
                                            <i className='material-icons opacity-50'>edit</i>
                                            </Link>
                                            <form>
                                            <input type="text" name="item_id" id="item_id" defaultValue={userItem["id"]} className='hidden'/>
                                            <DeleteButton formAction={delOneItem}/>
                                            </form>
                                            </div>
                                        </li>
                                    
})}
                        </ul>
                    
                    <Link href="/add-item">
                        <MyButton text="+" className='text-5xl w-20' />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default page