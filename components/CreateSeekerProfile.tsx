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
import { motion } from "framer-motion"
import { ToastContainer } from "@/components/Toast";

const CreateSeekerProfile = () => {
  const [profileSrc, setProfileSrc] = useState<string>('');
  const genderOptions = ["male", "female"] as const

  const { countries, countrySchema } = useCountries();

  const schema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
    last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
    gender: z.enum(genderOptions),
    username: z.string().min(2, { message: "Username is required" }).max(50, { message: "Username cannot exceed 50 characters" }),

    phone_number: z.string().min(2, { message: "phone number is required" }),
    date_of_birth: z.string().min(2, { message: "date of birth is required" }),
    country: countrySchema || z.string().min(1, { message: "Country is required" }),
    state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    post_code: z.string().min(2, { message: "Post Code is required" }),
    location: z.string().min(2, { message: "address is required" }),
    avatar_file: z.any().optional(),
  })

  const {
    form,
    loading,
    onSubmit
  } = useAuth({
    schema,
    action: createSeekerProfile,
    checked: true,
    path: '/find-service-providers',
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
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mt-6 mb-6"
      >
        <Form {...form}>
          <form className='flex items-center flex-col gap-y-9 w-full max-w-5xl px-4 py-16' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full items-center'>
              <div className='relative mb-4'>
                <div className='w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]'>
                  <Image src="/assets/images/profile.svg" alt='profile' className='z-0' width={43} height={48} />
                  {
                    profileSrc &&
                    <Image src={`${profileSrc}`} className='w-full h-full rounded-full object-cover z-10 absolute top-0 left-0' width={200} height={200} alt='profile image' />
                  }
                  <label htmlFor="fileInput">
                    <PlusIcon className='text-white w-10 h-10 cursor-pointer bg-primary-1 border-2 border-primary-three absolute rounded-full p-1 -bottom-1 -right-[3px] z-20' />
                  </label>
                </div>
                <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_picture"></input>
              </div>
              <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Find Services Faster</h1>
              <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>Create Your Seeker Profile</h3>
              <p className='text-primary-1 font-normal text-sm text-center mt-1'>Tap The Plus Icon above to add Image</p>
            </div>

            {/* inputs begings */}
            <div className='flex flex-col lg:flex-row gap-10'>
              <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">

                {/* FirstName & LastName */}
                <div>
                  <FormLabel className='font-normal text-xs text-primary-1 pb-5'>Confirm Basic Info</FormLabel>
                  <div className='flex gap-3 mt-2'>
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
                </div>

                {/* Gender */}
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

                {/* Username */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel className='font-normal text-xs text-primary-1'>User Name</FormLabel>
                        <FormControl>
                          <Input className='w-full' placeholder="MosesJohnson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* float to right */}
              </div>

              <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                {/* Phone Number & D.O.B. */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-xs text-primary-1'>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="+2349000000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel className='font-normal text-xs text-primary-1'>Date of Birth</FormLabel>
                        <FormControl>
                          <Input placeholder="D.O.B." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Country - State */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormLabel className='font-normal text-xs text-primary-1'>Location Information</FormLabel>
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
                        <FormLabel className='font-normal text-xs text-primary-1'>-</FormLabel>
                        <FormControl>
                          <Input placeholder="Delta State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Post_code & location(Address) */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="post_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* float to Left */}
              </div>
            </div>

            <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#" className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#" className="text-[#3FBFA9]">Privacy Policy</Link></p>
              <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create profile'}
              </Button>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/signin" className="text-primary-1">Login</Link></p>
            </div>

          </form>
        </Form>
      </motion.div>
        <ToastContainer theme="dark" pauseOnHover newestOnTop pauseOnFocusLoss />
    </div>
  )
}

export default CreateSeekerProfile