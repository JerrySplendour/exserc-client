"use client"

import { PlusIcon } from '@radix-ui/react-icons';
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
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
import {useRouter} from 'next/navigation'

const Seeker = () => {

  const [profileSrc, setProfileSrc] = useState<string>('');
  const router = useRouter()

  const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "username is required" })
      .max(50, { message: "username cannot exceed 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Target the confirmPassword field
    message: "Passwords must match",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      // setInputValue((val) => ({...val, ['img']: blob}))
      setProfileSrc(imageUrl)
    }
  }

  const onSubmit = () => {
    alert("Registration successful, Enter OK setup profile")
    router.push("./seeker/profile")
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-9 w-full max-w-[1024px] px-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full items-center'>
            {/* <div className='relative mb-4'>
              <div className='w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]'>
                <Image src="/assets/images/profile.svg" alt='profile' className='z-0' width={43} height={48} />
                {
                  profileSrc && 
                  <Image src={`${profileSrc}`} className='w-full h-full rounded-full object-cover z-10 absolute top-0 left-0' width={200} height={200} alt='profile image' />
                }
                <label htmlFor="fileInput">
                <PlusIcon  className='text-white w-6 h-6 cursor-pointer bg-primary-1 border-2 border-primary-three absolute rounded-full p-1 bottom-0 right-[7px] z-20' />
                </label>
              </div>
              <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_pic"></input>
            </div> */}
            <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Register</h1>
            <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>To find a service</h3>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
          </div>
          <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></p>
            <Button variant="default" className='w-full' type="submit">Register</Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin"  className="text-primary-1">Login</Link></p>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default Seeker