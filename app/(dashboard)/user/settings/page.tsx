"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiCamera } from 'react-icons/bi';
import { z } from 'zod';

const Settings = () => {

    const [profileSrc, setProfileSrc] = useState<string>('');
    const [countries, setCountries] = useState<string[]>(["AW Aruba"]);
    const [countryEnum, setCountryEnum] = useState<any>(null);
  
    const serviceOptions = ["service1", "service2", "service3"] as const
    const genderOptions = ["male", "female"] as const
    const intervalOptions = ["1 hour", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10 hours"] as const
  
    useEffect(() => {
     
    const fecthcountry = async () => {
      const data =  await fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          return data.countries.map((country: any) => {
            return country.label
          })
        });
        setCountries(data);
        setCountryEnum(z.enum(data));
    }
  
     fecthcountry()
    }, []);
  
  
    const formSchema = z.object({
      fullname: z.string().min(2, { message: "Full name is required" }).max(50, { message: "Full name cannot exceed 50 characters" }),
      mobileNumber: z.string().min(2, { message: "mobile number is required" }).max(15, { message: "mobile number cannot exceed 15 characters" }),
      email: z.string().email({message: "Invalid email address"}),
      password: z.string().min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
      service: z.enum(serviceOptions),
      gender: z.enum(genderOptions),
      from: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
      to: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
      interval: z.enum(intervalOptions),
      country: countryEnum || z.string().min(1, { message: "Country is required" }),
      state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
      address: z.string().min(2, { message: "address is required" }),
      referralCode: z.string().optional(),
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fullname: "",
        email: "",
        password: "",
        mobileNumber: "",
        service: "service1",
        gender: "male",
        from: "00:00",
        to: "00:00",
        interval: "1 hour",
        country: "🇦🇼 Aruba",
        state: "",
        address: "",
        referralCode: ""
      },
    })
  
    const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files || []
      if (files[0]) {
        const blob = new Blob([files[0]], { type: files[0].type });
        const imageUrl = URL.createObjectURL(blob);
        setProfileSrc(imageUrl)
      }
    }
  
    const onSubmit = () => {
      console.log('submitted...........')
    }

    

  return (
    <div className='px-2 md:px-10'>
        <section className='py-4'>
            <div className='flex flex-col gap-3'>
                <p className='text-black-1 text-xl lg:text-2xl'>Account Settings</p>
            </div>
        </section>
        <section className='flex flex-col xl:flex-row items-start gap-6 xl:gap-10 py-4'>
            <div className='flex flex-row xl:flex-col justify-between rounded-lg xl:rounded-2xl xl:border-2 overflow-hidden w-full max-w-[400px] xl:max-w-[270px] shadow-md xl:shadow-xl'>
                <Link href="/settings" className='p-2 xl:p-3 px-4 bg-[#9A65CF4D] text-primary-1 font-medium text-base xl:text-xl'>
                    <span>Profile settings</span>
                </Link>
                <Link href="/password" className='p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl'>
                    <span>Password</span>
                </Link>
                <Link href="/notifications" className='p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 font-medium text-base xl:text-xl'>
                    <span>Notifications</span>
                </Link>
            </div>
            <div className='flex flex-col rounded-2xl border-2 overflow-hidden py-3 shadow-xl'>
                <Form {...form}>
                <form className='flex items-start flex-col w-full max-w-[1024px] px-8 py-16' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex gap-8 w-full items-center'>
                    <div className='relative mb-4'>
                        <div className='w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]'>
                            <Image src="/assets/images/profile.svg" alt='profile' className='z-0' width={43} height={48} />
                            {
                            profileSrc && 
                            <Image src={`${profileSrc}`} className='w-auto h-auto rounded-full object-cover z-10 absolute top-0 left-0' width={200} height={200} alt='profile image' />
                            }
                            <label htmlFor="fileInput">
                            <BiCamera  className='text-white w-9 h-9 xl:w-10 xl:h-10 cursor-pointer bg-primary-1 border-[6px] border-white absolute rounded-full p-1 -right-2 bottom-0 xl:right-0 z-20' />
                            </label>
                        </div>
                        <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_pic"></input>
                    </div>
                    <Button size="sm" >Delete Avatar</Button>
                </div>

                {/* inputs begings */}
                <div className='flex items-start flex-col md:flex-row gap-10'>
                    <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                        <div>
                            <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem
                                className='w-full'
                                >
                                <FormLabel className='font-normal text-xs text-primary-1'>Full Name</FormLabel>
                                <FormControl
                                className='w-full'
                                >
                                    <Input className='w-full' placeholder="Full name" {...field} />
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
                                    <FormLabel className='font-normal text-xs text-primary-1'>Email Address</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="Email Address" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div>
                            <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-normal text-xs text-primary-1'>Gender</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {
                                        genderOptions.map((option) => (
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
                    </div>
                    {/* float to right */}
                    <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                        <div>
                            <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-normal text-xs text-primary-1'>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div>
                            <label className='font-normal text-xs text-primary-1'>Select available time</label>
                            <div className='flex items-center justify-between mt-2'>
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel className='font-normal text-xs text-[#CCB2E7]'>From</FormLabel> */}
                                    <FormControl>
                                    <Input type='time' placeholder="9:00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel className='font-normal text-xs text-[#CCB2E7]'>To</FormLabel> */}
                                    <FormControl>
                                    <Input type='time' placeholder="9:00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                        </div>
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
                                    countries?.map((option: string) => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
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
                    </div>
                </div>
                <div className='pt-4 w-full sm:max-w-[547px]'>
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='font-normal text-xs text-primary-1'>Residential Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter Address" rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className='mt-5 lg:mt-10'>
                    <Button size="rs">Save Changes</Button>
                </div>
                </form>
                </Form>
            </div>
        </section>
    </div>
  )
}

export default Settings