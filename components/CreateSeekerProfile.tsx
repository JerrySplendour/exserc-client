"use client"

import { PlusIcon } from '@radix-ui/react-icons';
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';
import { updateSeekerProfile } from '@/actions/user';

const CreateSeekerProfile  = () => {
  const [buttonStatus, setButtonStatus] = useState<boolean>(false)
  const [profileSrc, setProfileSrc] = useState<string>('');
  const [imgBlob, setImgBlob] = useState<null | Blob>(null);
  const [countries, setCountries] = useState<string[]>(["NG Nigeria"]);
  const [countryEnum, setCountryEnum] = useState<any>(null);
  const router = useRouter()
  const { toast } = useToast()
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
    full_name: z.string().min(2, { message: "Full name is required" }).max(50, { message: "Full name cannot exceed 50 characters" }),
    country: countryEnum || z.string().min(1, { message: "Country is required" }),
    state_of_residence: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    location: z.string().min(2, { message: "address is required" }),
    phone_number: z.string().min(2, { message: "phone number is required" }),
    gender: z.enum(genderOptions),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      country: "NG Nigeria",
      state_of_residence: "",
      location: "",
      gender: "Male",
    },
  })

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      setProfileSrc(imageUrl)
      setImgBlob(files[0])
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.set('full_name', values.full_name)
    formData.set('country', values.country)
    formData.set('state_of_residence', values.state_of_residence)
    formData.set('gender', values.gender)
    formData.set('location', values.location)
    formData.set('phone_number', values.phone_number)
    if(imgBlob instanceof Blob){
      formData.set('profile_picture', imgBlob)
    }else{
      formData.set('profile_picture', '')
    }
    setButtonStatus(val => !val)
    const res = await updateSeekerProfile(formData)
    if(res?.username){
      setButtonStatus(val => !val)
      toast({
        title: "Success ✅",
        description: `profile created ${res.username}!`,
      })
      router.push('/find-service-providers')
    }else{
      toast({
        title: "Error",
        variant: 'destructive',
        description: res.message,
      })
      setButtonStatus(val => !val)
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
                  name="full_name"
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
                        <Input className='w-full' placeholder="Phone number" {...field} />
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
                name="state_of_residence"
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
    </div>
  )
}

export default CreateSeekerProfile