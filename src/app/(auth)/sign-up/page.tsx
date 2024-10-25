import MyButton from '@/app/components/ui/MyButton'
import { signup } from '../../actions'
import Link from 'next/link'
export default function SignUp() {
  return (

        <div style={{height:"80vh"}} className="flex pt- justify-center items-center">
        <div className="w-72 h-auto py-2 flex justify-center items-center rounded-md border border-gray-200 bg-gray-100">
        <form className='flex flex-col w-60'>
<h3 className='text-xl mb-1'>Sign up</h3>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" className='rounded-md border h-8 border-gray-300 bg-gray-100' required />
      <label htmlFor="password" className='mt-1'>Password:</label>
      <input id="password" name="password" type="password" className='rounded-md h-8 border border-gray-300 bg-gray-100' required />
      <label htmlFor="nom" className='mt-1'>Nom:</label>
      <input id="nom" name="nom" type="text" required className='rounded-md h-8 border border-gray-300 bg-gray-100'/>
      <label htmlFor="adresse" className='mt-1'>Adresse:</label>
      <input id="rue" name="rue" type="text" placeholder='rue' required className='px-2 rounded-md mb-5 h-8 border border-gray-300 bg-gray-100'/>
      <input id="ville" name="ville" type="text" placeholder='ville' required className='px-2 rounded-md mb-5 h-8 border border-gray-300 bg-gray-100'/>
      <input id="departement" name="departement" type="text" placeholder='n°département' required className='px-2 rounded-md mb-5 h-8 border border-gray-300 bg-gray-100'/>
      <MyButton formAction={signup} text="Sign up"></MyButton>
      <Link href="/login" className='text-center'>Log in</Link>
    </form>
        </div>
        </div>
  )
}   