"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import Image from 'next/image'
import { login } from '@/actions/auth'
import { LoginFormSchema } from '@/lib/definitions'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/hooks/useAuth'

const Login = () => {

  // Custom hook to handle authentication logic
  // It uses the LoginFormSchema for validation and the login action for authentication
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    schema: LoginFormSchema,
    action: login,
    checked: true,
    path: '/find-service-providers',

    })


  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full items-center gap-2'>
            <div>
              <Link href="/">
                <div className='w-12 h-12 rounded-md overflow-hidden'>
                  <Image src='/assets/images/favicon.png' className='block w-full h-full object-cover' alt='logo' width={50} height={50} />
                </div>
              </Link>
            </div>
            <h1 className='font-bold text-2xl sm:text-3xl text-center text-black-1 mb-6'>Login</h1>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
          </div>
          <div className='flex items-center justify-between w-full mb-4 max-w-[482px]'>
            <div className='flex items-center gap-2'>
              <Checkbox id='login' />
              <label htmlFor='login'  className='text-black-1 font-medium text-[10px] sm:text-sm'>Keep me logged in</label>
            </div>
            <Link href="login/forgot-password" className='text-red-400 font-medium text-xs sm:text-sm'>Forgot Password?</Link>
          </div>
          <div className='mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center'>
            <Button variant="default" className='w-full' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Don&rsquo;t have an account? <Link href="/signup" className="text-primary-1">Register</Link></p>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default Login