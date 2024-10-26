"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MyButton from './MyButton';
import { updateFilter } from '@/app/actions';



interface param{
    title:string,
    show_filter:boolean,
    localisations?:string[],
    allItems?:any[],
    onUpdate?:Dispatch<SetStateAction<any[]>>
}

const SubHeader: React.FC<param>  = ({title,show_filter,localisations,onUpdate}) => {
  const [formInfos,setFormInfos] = useState<FormData>()
  useEffect(()=>{
    if ((typeof formInfos)=="undefined"){
      return
    }
    updateFilter(formInfos!).then(
      result=>onUpdate?.(result)
    );
    
  },[formInfos])
  
  return (
    <div className='divide-y mt-8 mb-4'>
        <div className="flex flex-row justify-between mb-2">
            <h2 className='text-3xl'>{title}</h2>
            {
                show_filter?
                <form className="flex flex-row space-x-2 justify-center items-center">
                  <p><b>Prix</b></p>
                  <input id="price_min" name="price_min" className='w-24 h-8 p-2 rounded border border-black bg-gray-100 text-sm' placeholder='minimum' type="number" />
                  <input id="price_max" name="price_max" className='w-24 h-8 p-2 rounded border border-black bg-gray-100 text-sm' placeholder='maximum' type="number" />
                  <input id="search" name="search" className='w-24 h-8 p-2 rounded border border-black bg-gray-100 text-sm' placeholder='keyword' type="text" />
                  <select id="local" name="local" className='w-36 h-8 rounded border border-black bg-gray-100 text-sm py-1 text-center'  defaultValue="default">
                    <option value="default">Département</option>
                    {
                      localisations &&
                      localisations.map((localisation,index)=>
                      <option key={index} value={localisation}>
                        {localisation}
                      </option>
                      )
                    }
                    
                  </select>
                  <input type="date" name="date" id="date" className='w-36 h-8 rounded border border-black bg-gray-100 text-sm p-1 text-center' />
  <MyButton text='Ok' formAction={(formData:FormData)=>{
    setFormInfos(formData) 
  }} ></MyButton>
                </form>
                
                :<p></p>
            }   
        </div>
       
<p></p>
    </div>
  )
}

export default SubHeader