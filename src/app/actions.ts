'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { User } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data_insert = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { data, error } = await supabase.auth.signUp(data_insert)

  if (error) {
    console.log(error);
    redirect('/error')
  }




  const { error: new_error } = await supabase
    .from('users')
    .insert({ user_id: data["user"]!["id"], name: formData.get("nom") as string, 
      adress: formData.get("rue") as string +" "+ formData.get("ville") as string +" "+ formData.get("departement") as string })

  if (new_error) {
    console.log({ user_id: data["user"]!["id"], name: formData.get("nom") as string, adress: formData.get("adresse") as string })
    console.log(new_error);
    redirect('/error')
  }


  revalidatePath('/', 'layout')
  redirect('/')
}


export const editUser = async (formData: FormData) => {
  const supabase = await createClient()
  console.log(formData)
  const { error } = await supabase
    .from('users')
    .update({ name: formData.get('nom') as string, adress: formData.get('adresse') as string })
    .eq('user_id', (await supabase.auth.getUser())["data"]["user"]!["id"])
  if (error) {
    console.log(error)
    redirect('/error')
  }
  console.log('ok')
  const { error: auth_error } = await supabase.auth.updateUser({
    email: formData.get("email") as string
  })
  if (auth_error) {
    console.log(auth_error)
    redirect('/error')
  }
  return
}

export const addItem = async (formData: FormData) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('items')
    .insert({
      user_id: (await supabase.auth.getUser())["data"]["user"]!["id"],
      title: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      is_sold: false
    })
    .select()
  if (error) {
    console.log(error)
    redirect("/error")
  }

  const { error: image_error } = await supabase
    .from('item_images')
    .insert({
      item_id: data[0]["id"],
      image_url: formData.get("base64image") as string
    })
  if (image_error) {
    console.log(image_error)
    redirect("/error")
  }
  redirect('/')
}

export const editItem= async(formData:FormData)=>{
  const supabase = await createClient()
  
  const  { error } = await supabase
  .from('item_images')
  .update({ image_url:formData.get('base64image') as string })
  .eq('item_id', formData.get("item_id") as string)
  if (error) {
    console.log(error)
    redirect("/error")
  }
  
  const { error:error_bis } = await supabase
  .from('items')
  .update({ title:formData.get('name') as string,description:formData.get('description') as string,
    price:formData.get('price') as string
   })
  .eq('id', formData.get("item_id") as string)
  if (error_bis) {
    console.log(error_bis)
    redirect("/error")
  }
  console.log('ojojo')
}
export const getUserItems = async (user: User) => {
  if (user) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('items')
      .select()
      .eq("user_id", user["id"])
    if (error) {
      redirect("/error")
    }
    for (let i = 0; i < data.length; i++) {
      const { data: images, error: error_image } = await supabase
        .from('item_images')
        .select()
        .eq("item_id", data[i]["id"])
      if (error_image) {
        redirect("/error")
      }
      if (images[0]["image_url"]) {
        data[i]["image_url"] = images[0]["image_url"]
      }
    }
    return data
  }
  else {
    redirect('/error')
  }
}


export const updateFilter = async (formData:FormData)=>{
  const supabase = await createClient();
  let result;
  let err;
  if ( formData.get("date")){
    const { data, error } =  await supabase
    .from('items')
    .select("id,user_id, title, description, price, created_at,is_sold,users!inner(user_id,adress, name),item_images(image_url) ")
    .gt('price', parseFloat((formData.get("price_min") as string)!=""?(formData.get("price_min") as string):"0"))
    .lt('price', parseFloat((formData.get("price_max") as string)!=""?(formData.get("price_max") as string):"10000000000"))
    .gt("created_at", (formData.get("date")))
    .ilike('description', formData.get("search")!="" ? `%${formData.get("search")}%` : '%')
    .ilike('users.adress', formData.get("local")!="default" ? `%${formData.get("local")}%` : '%')
    .eq('is_sold', false); 
    result=data;err=error;
  }
  else{
    const { data, error } =  await supabase
    .from('items')
    .select(`id,user_id, title, description, price, created_at,is_sold,users!inner(user_id,adress, name),item_images(image_url) `)
    .gt('price', parseFloat((formData.get("price_min") as string)!=""?(formData.get("price_min") as string):"0"))
    .gt('created_at',formData.get("date")!=""?formData.get("date"):"2000-01-01")
    .lt('price', parseFloat((formData.get("price_max") as string)!=""?(formData.get("price_max") as string):"10000000000"))
    .ilike('description', formData.get("search")!="" ? `%${formData.get("search")}%` : '%')
    .ilike('users.adress', formData.get("local")!="default" ? `%${formData.get("local")}%` : '%')
    .eq('is_sold', false); 
    result=data;err=error;
  }
    //.eq((formData.get("name") as string)=="default"?)
  if (err) {
    console.log(err)
    redirect("/error")
  }
  /*
  for (let i = 0; i < data.length; i++) {
    const { data: images, error: error_image } = await supabase
      .from('item_images')
      .select()
      .eq("item_id", data[i]["id"])
    if (error_image) {
      redirect("/error")
    }
    if (images[0]["image_url"]) {
      data[i]["image_url"] = images[0]["image_url"]
    }
  }*/
  return result!
}

export const getAllItems = async ()=>{
  const supabase = await createClient();
  const { data, error } = await supabase
  .from('items')
  .select(`
    id, 
    user_id, 
    title, 
    description, 
    price, 
    created_at, 
    is_sold,
    item_images(item_id, image_url), 
    users(user_id, name)          
  `)
  .eq('is_sold', false); 
    
  if (error) {
    console.log(error)
    redirect("/error")
  }

  return data
}

export const getItem= async(id:number)=>{
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select(`id, 
      user_id, 
      title, 
      description, 
      price, 
      created_at, 
      is_sold,
      item_images(id,item_id, image_url), 
      users(user_id, adress,name)`)
    .eq("id",id)
  if (error){
    console.log(error)
    redirect("/error")
  }
  return data
}

export const getLocalisations = async ()=>{
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('items')
    .select("users(adress)")
    .eq("is_sold",false)
  if (error){
    console.log(error)
    redirect("/error")
  }
  if (data)
{    const code = data.map(elt => {
      return elt.users.adress.split(" ")[(elt.users["adress"].split(" ").length)-1]

    })
    return code}
}

export const handleFormAddItem = async(formData:FormData)=>{
  const cookieStore = await cookies()
  if (!cookieStore.has('cart')){
      cookieStore.set('cart',(formData.get("id") as string))
      return
  }
  if (!cookieStore.get('cart')!.value){
    cookieStore.set('cart',(formData.get("id") as string))
    return
  } 
  cookieStore.set('cart',cookieStore.get('cart')!.value+" "+(formData.get("id") as string))

}

export const delOneItem = async(formData:FormData)=>{
  console.log('ihihihi')
  const supabase = await createClient();
  let response = await supabase
  .from('item_images')
  .delete()
  .eq('item_id',  formData.get("item_id") as string)
  console.log(response)
  response = await supabase
  .from('items')
  .delete()
  .eq('id',  formData.get("item_id") as string)
  console.log(response)
}

export const delItem = async(items:any[],price:number,is_ordering:boolean)=>{
  const supabase = await createClient();
  for (let i=0;i<items.length;i++){
    let response = await supabase
    .from('item_images')
    .delete()
    .eq('id', items[i][0]["item_images"][0]["id"])

    response = await supabase
    .from('items')
    .delete()
    .eq('id', items[i][0]["id"])
    console.log(response)
  }console.log( (await supabase.auth.getUser())["data"]["user"]!["id"])
if (is_ordering){
  const cookieStore = await cookies()
    cookieStore.delete('cart')
  }
  const { error } = await supabase
  .from('orders')
  .insert({ user_id:  (await supabase.auth.getUser())["data"]["user"]!["id"],
    total_price:price
    }) 
  if (error){
    console.log(error)
    redirect("/error")
  }
 
  redirect('/')
}