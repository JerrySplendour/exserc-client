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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { SignupFormSchema } from '@/lib/definitions'
import { signup } from '@/actions/auth'
import { useToast } from '@/hooks/use-toast'


const SignUpOption = ({params}: {params: {option: 'seeker' | 'provider'}}) => {
  const { toast } = useToast()
  const [buttonStatus, setButtonStatus] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
      role: params?.option
    },
  })

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    const formData = new FormData()
    formData.set("username", values.username)
    formData.set("email", values.email)
    formData.set("password1", values.password1)
    formData.set("password2", values.password2)
    formData.set("role", params.option)
    setButtonStatus(val => !val)
    const res = await signup(formData)
    if(res?.message){
      toast({
        title: "Error",
        variant: 'destructive',
        description: res.message,
      })
      setButtonStatus(val => !val)
    }else{
      setButtonStatus(val => !val)
      setOpenDialog(true)
    }
  }

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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                name="password1"
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
                name="password2"
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
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></p>
            <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={buttonStatus}>
              {buttonStatus ? 'Loading...' : 'Register'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin"  className="text-primary-1">Login</Link></p>
          </div>

        </form>
      </Form>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-primary-1'>Account created!✅</DialogTitle>
            <DialogDescription className='text-primary-1'>
              You have been successfully registered as a service {params.option}, proceed to create your profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Link href={`/create-profile?option=${params?.option}`} className='text-primary-1'>
              Proceed
            </Link>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignUpOption