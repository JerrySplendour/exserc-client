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
import { createProviderProfile } from '@/actions/user';
import { Textarea } from './ui/textarea';
import useGeoLocation from '@/hooks/useGeoLocation';
import useCountries from '@/hooks/useCountries';
import useService from '@/hooks/useService';
import { useAuth } from '@/hooks/useAuth';
import { motion } from "framer-motion"

const CreateProviderProfile = () => {

  const [profileSrc, setProfileSrc] = useState<string>('');
  const educationOptions = [
    { value: 'none', label: 'No Formal Education' },
    { value: 'primary', label: 'Primary Education' },
    { value: 'ssce', label: 'SSCE/WAEC/NECO' },
    { value: 'ond', label: 'OND/NCE' },
    { value: 'hnd', label: 'HND' },
    { value: 'bsc', label: 'B.Sc/B.A/B.Eng' },
    { value: 'msc', label: 'M.Sc/M.A/M.Eng or higher' }
  ] as const;
  const genderOptions = ["male", "female"] as const;
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const { location, error } = useGeoLocation()
  const { countries, countrySchema } = useCountries()
  const { serviceCategories, services, loading } = useService()
  const [selectedService, setSelectedService] = useState<string[] | null>(null)

  const formSchema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
    last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
    gender: z.enum(genderOptions),
    phone_number: z.string().regex(/^\+?[0-9]{6,14}$/, { message: "Invalid phone number" }),
    date_of_birth: z.string().min(2, { message: "date of birth is required" }),

    business_name: z.string().min(2, { message: "company name is required" }).max(50, { message: "company name cannot exceed 50 characters" }),
    core_service: z.string().min(1, { message: "Service category is required" }),
    skills: z.string().min(1, { message: "Service is required" }),
    // education_level: z.string().min(1, { message: "Education level is required" }),


    available_work_time: z.string().nonempty("Work time is required"),
    country: countrySchema || z.string().min(1, { message: "Country is required" }),
    state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    post_code: z.string().min(1, { message: "Postal Code is required" }),
    location: z.string().min(2, { message: "address is required" }),
    rc_number: z.string().optional(),
    // bio: z.string().min(2, { message: "Bio is required" }),
    avatar_file: z.instanceof(File).optional(),
  })

  const {
    onSubmit,
    form
  } = useAuth({
    schema: formSchema,
    action: createProviderProfile,
    path: '/find-service-providers',
    checked: true,
  })

  const handleServiceCategoryChange = (categoryId: number) => {
    const serviceOptions = services.filter(service => service.category === categoryId)
    if (serviceOptions.length > 0) {
      const op = serviceOptions.map(service => service.name)
      setSelectedService(op)
    }
  }

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      setProfileSrc(imageUrl)
      form.setValue("avatar_file", files[0])
    }
  }


  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl mt-6 mb-6"
      >
        <Form {...form}>
          <form className='flex items-center flex-col gap-y-9 w-full max-w-5xl px-4 py-16' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full items-center'>
              <div className='relative mb-4'>
                <div className='w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-teal-600 rounded-full relative flex items-center justify-center bg-[#F8F7F7]'>
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
              <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Register</h1>
              <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>To provide service</h3>
              <p className='text-primary-1 font-normal text-sm text-center mt-1'>Tap The Plus Icon above to add Image</p>
            </div>

            {/* inputs begings */}
            <div className='flex flex-col lg:flex-row gap-10 w-full max-w-3xl lg:max-w-4xl md:max-w-3xl'>
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
                              genderOptions ?
                                genderOptions?.map((option: string) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                )) : (
                                  <SelectItem disabled value="empty">Gender</SelectItem>
                                )
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone Number & D.O.B. */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel className='font-normal text-xs text-primary-1'>Phone number</FormLabel> */}
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
                        <FormControl>
                          <Input placeholder="D.O.B." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Business Name */}
                <div className='flex items-center justify-between gap-3 mt-3'>
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem
                        className='w-full'
                      >
                        <FormLabel className='font-normal text-xs text-primary-1'>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder=
                            "Business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Service Category & Skills */}
                <div>
                  <FormLabel className='font-normal text-xs text-primary-1'>Service Categories</FormLabel>
                  <div className='flex gap-3 mt-2'>
                    <FormField
                      control={form.control}
                      name="core_service"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={
                            // field.onChange
                            (value) => {
                              field.onChange(value)
                              handleServiceCategoryChange(Number(value))
                            }

                          }>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Service Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                serviceCategories.map((option) => (
                                  <SelectItem key={option.name} value={option.id.toString()}>{option.name}</SelectItem>
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
                      name="skills"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select A Skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedService && selectedService.length > 0 ? (
                                selectedService.map((skill) => (
                                  <SelectItem key={skill} value={skill}>
                                    {skill}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="empty">Select Service Category</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* <div>
                  <FormField
                    control={form.control}
                    name="education_level"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Education Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='w-full'>
                            {
                              educationOptions?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}

                {/* float to right */}

              </div>

              <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                {/* FROM - TO TIME */}
                <FormField
                  control={form.control}
                  name="available_work_time"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-normal text-xs text-primary-1">Available Work Time</FormLabel>
                      <div className="flex gap-3 mt-2">
                        {/* FROM TIME */}
                        <Select
                          onValueChange={(value) => {
                            setFromTime(value);
                            field.onChange(`${value}-${toTime}`); // update RHF value
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="From" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"].map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* TO TIME */}
                        <Select
                          onValueChange={(value) => {
                            setToTime(value);
                            field.onChange(`${fromTime}-${value}`); // update RHF value
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="To" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"].map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country - State */}
                <div className='mt-1'>
                  <FormLabel className="font-normal text-xs text-primary-1">Location Details</FormLabel>
                  <div className='flex items-center justify-between gap-3 mt-2'>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem
                          className='w-1/2'
                        >
                          <Select onValueChange={field.onChange} value={field.value}>
                            {/* <FormLabel className='font-normal text-xs text-primary-1'>Country</FormLabel> */}
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" defaultValue={field.value} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                countries?.map((option) => (
                                  <SelectItem key={option.name} value={option.id.toString()}>{option.name}</SelectItem>
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
                        <FormItem
                          className='w-1/2'
                        >
                          {/* <FormLabel className='font-normal text-xs text-primary-1'>State of Residence</FormLabel> */}
                          <FormControl>
                            <Input placeholder="Delta State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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

                {/* RC Number */}
                <div>
                  <FormField
                    control={form.control}
                    name="rc_number"
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

                {/* float to Left */}
              </div>
            </div>


            {/* <div className='w-full max-w-3xl lg:max-w-4xl md:max-w-3xl'>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem
                    className='w-full'
                  >
                    <FormLabel className='font-normal text-xs text-primary-1'>Tell us about yourself</FormLabel>
                    <FormControl
                      className='w-full'
                    >
                      <Textarea className='w-full' placeholder="Bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#" className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#" className="text-[#3FBFA9]">Privacy Policy</Link></p>
              <Button variant="default" className='w-full' type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create Profile'}
              </Button>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/login" className="text-primary-1">Login</Link></p>
            </div>

          </form>
        </Form>
      </motion.div>
    </div>
  )
}

export default CreateProviderProfile