import MyButton from '@/app/components/ui/MyButton'
import { login } from '../../actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div style={{height:"80vh"}} className="flex pt- justify-center items-center">
    <div className="w-72 h-64 flex justify-center items-center rounded-md border border-gray-200 bg-gray-100">
      <form className='flex flex-col w-60'>
        <h3 className='text-xl'>Log in</h3>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className='rounded-md border h-8 border-gray-300 bg-gray-100' required />
        <label htmlFor="password" className='mt-1'>Password:</label>
        <input id="password" name="password" type="password" className='rounded-md mb-5 h-8 border border-gray-300 bg-gray-100' required />
        
        <MyButton text='Log in' formAction={login}></MyButton>
        <Link href="/sign-up" className='text-center'>sign up</Link>
      </form>
    </div>
    </div>
  )
}