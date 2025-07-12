"use client"

import { PlusIcon } from '@radix-ui/react-icons';
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { createSeekerProfile } from '@/actions/user';
import { useAuth } from '@/hooks/useAuth';
import useCountries from '@/hooks/useCountries';

const CreateSeekerProfile  = () => {
  const [profileSrc, setProfileSrc] = useState<string>('');
  const genderOptions = ["male", "female"] as const

  const { countries, countrySchema } = useCountries();

  const schema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
    last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
    country: countrySchema || z.string().min(1, { message: "Country is required" }),
    state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    location: z.string().min(2, { message: "address is required" }),
    date_of_birth: z.string().min(2, { message: "date of birth is required" }),
    phone_number: z.string().min(2, { message: "phone number is required" }),
    gender: z.enum(genderOptions),
    avatar_file: z.instanceof(File).optional(),
  })

  const {
    form,
    loading,
    onSubmit
  } = useAuth({
    schema,
    action: createSeekerProfile,
    checked: true,
    path: '/create-pin',
  })

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      form.setValue('avatar_file', files[0])
      setProfileSrc(imageUrl)
    }
  }

  return (
    <div className='flex items-start justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-9 w-full max-w-[1024px] px-4 py-16' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full items-center'>
            <div className='relative mb-4'>
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
              <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_picture"></input>
            </div>
            <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Find Services Faster</h1>
            <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>Create Your Seeker Profile</h3>
          </div>

          {/* inputs begings */}
          <div className='flex flex-col lg:flex-row gap-10'>
            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              <div>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem
                    className='w-full'
                    >
                      <FormControl 
                      className='w-full'
                      >
                        <Input className='w-full' placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem
                    className='w-full'
                    >
                      <FormControl 
                      className='w-full'
                      >
                        <Input className='w-full' placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className='flex items-center justify-between gap-3'>
                <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        {
                          genderOptions?.map((option: string) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                />
              </div>
              <div className='flex items-center justify-between gap-3'>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input className='w-full' placeholder="+234XXXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* float to right */}
                
            </div>
            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              <div className='flex items-center justify-between gap-3'>
                <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                    <FormLabel className='font-normal text-xs text-primary-1'>Country</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          countries?.map((c) => (
                            <SelectItem key={c.name} value={c.id.toString()}>{c.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-normal text-xs text-primary-1'>State of Residence</FormLabel>
                    <FormControl>
                      <Input placeholder="Delta State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#"  className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#"  className="text-[#3FBFA9]">Privacy Policy</Link></p>
            <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Create profile'}
            </Button>
            <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin"  className="text-primary-1">Login</Link></p>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default CreateSeekerProfile