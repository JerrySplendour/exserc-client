"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { SignupFormSchema } from '@/lib/definitions'
import { signup } from '@/actions/auth'
import { useAuth } from '@/hooks/useAuth'


const SignUpOption = ({params}: {params: {option: 'seeker' | 'provider'}}) => {
  const [checked, setChecked] = useState<boolean>(false)

  // Custom hook to handle authentication logic
  // It uses the SignupFormSchema for validation and the signup action for registration
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    role: params.option,
    schema: SignupFormSchema,
    action: signup,
    checked,
    path: `/signup/verify?role=${params.option}`,
  })

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-9 w-full max-w-[1024px] px-4' 
        onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-col w-full items-center'>
            <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Register</h1>
            <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1 capitalize'>To {params.option} service</h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
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
            <div>
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
          </div>
          <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
            <div className='flex items-center gap-2'>
              <Checkbox id='terms' onCheckedChange={(val: boolean) => setChecked(val)} />
              <label htmlFor='terms'  className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></label>
            </div>
            <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin"  className="text-primary-1">Login</Link></p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUpOption