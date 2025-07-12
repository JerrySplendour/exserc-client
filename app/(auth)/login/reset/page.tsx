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
import { resetPassword } from '@/actions/auth'
import { ResetPasswordSchema } from '@/lib/definitions'
import { useAuth } from '@/hooks/useAuth'

const RestPassword = () => {

  // Custom hook to handle authentication logic
  // It uses the LoginFormSchema for validation and the login action for authentication
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    schema: ResetPasswordSchema,
    action: resetPassword,
    checked: true,
    path: '/login',

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
            <h1 className='font-bold text-2xl sm:text-3xl text-center text-black-1 mb-6'>Change Password</h1>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="New password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
          </div>
          <div className='mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center'>
            <Button variant="default" className='w-full' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Reset Password'}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default RestPassword