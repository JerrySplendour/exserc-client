"use client"

import { PlusIcon } from '@radix-ui/react-icons';
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useRouter } from 'next/navigation';

const CreateProviderProfile  = () => {

  const [profileSrc, setProfileSrc] = useState<string>('');
  const [countries, setCountries] = useState<string[]>(["AW Aruba"]);
  const [countryEnum, setCountryEnum] = useState<any>(null);
  const router = useRouter()

  const serviceOptions = ["service1", "service2", "service3"] as const
  const skillOptions = ["skill1", "skill2", "skill3"] as const
  const educationOptions = ["Diploma", "WAEC", "BSC"] as const
  const genderOptions = ["Male", "Female"] as const

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
    company: z.string().min(2, { message: "company name is required" }).max(50, { message: "company name cannot exceed 50 characters" }),
    service: z.enum(serviceOptions),
    skill: z.enum(skillOptions),
    gender: z.enum(genderOptions),
    education: z.enum(educationOptions),
    country: countryEnum || z.string().min(1, { message: "Country is required" }),
    state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    address: z.string().min(2, { message: "address is required" }),
    rcNumber: z.string().min(8, { message: "RC numnber required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      company: "",
      service: "service1",
      skill: "skill1",
      rcNumber: "",
      country: "🇦🇼 Aruba",
      state: "",
      address: "",
      education: "Diploma",
      gender: "Male",
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
    alert("Profile setUp successful")
    router.push("/seeker")

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
              <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_pic"></input>
            </div>
            <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Register</h1>
            <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>To provide service</h3>
          </div>

          {/* inputs begings */}
          <div className='flex flex-col lg:flex-row gap-10'>
            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              <div>
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem
                    className='w-full'
                    >
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
              <div className='flex items-center justify-between gap-3'>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type of service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            serviceOptions.map((option) => (
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
              <div>
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            skillOptions.map((option) => (
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
                name="education"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select onValueChange={field.onChange}>
                    <FormLabel className='font-normal text-xs text-primary-1'>Education</FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Education Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        {
                          educationOptions?.map((option: string) => (
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
              {/* float to right */}
                
            </div>
            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              <div>
              <FormField
                  control={form.control}
                  name="rcNumber"
                  render={({ field }) => (
                    <FormItem
                    className='w-full'
                    >
                      <FormLabel className='font-normal text-xs text-primary-1'>RC Number</FormLabel>
                      <FormControl 
                      className='w-full'
                      >
                        <Input className='w-full' placeholder="Enter RC Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div>
                <FormField
                  control={form.control}
                  name="address"
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

export default CreateProviderProfile