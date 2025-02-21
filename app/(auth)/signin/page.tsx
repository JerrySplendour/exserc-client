"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const [buttonStatus, setButtonStatus] = useState<boolean>(false)
  
  const router = useRouter()
  const { toast } = useToast()
  const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.set("email", values.email)
    formData.set("password", values.password)
    setButtonStatus(val => !val)
    const res = await login(formData)
    if(res?.username){
      toast({
        title: "Success ✅",
        description: `Welcome ${res.username}!`,
      })
      router.push('/find-service-providers')
    }else{
      toast({
        title: "Error",
        variant: 'destructive',
        description: res.message,
      })
    }
    setButtonStatus(val => !val)
  }

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
              
          </div>
          <div className='mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center'>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></p>
            <Button variant="default" className='w-full' type="submit" disabled={buttonStatus}>
              {buttonStatus ? 'Loading...' : 'Login'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Don&rsquo;t have an account? <Link href="/signup" className="text-primary-1">Register</Link></p>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default SignIn