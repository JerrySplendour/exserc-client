"use client"

import DropdownSelect from '@/components/DropdownSelect'
import { Button } from '@/components/ui/button'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { FaMapLocationDot } from 'react-icons/fa6'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { MdLocationPin } from 'react-icons/md'
  

  



const Seeker = () => {
  
  const [searchText, setSearchText] = useState<string>("")
  const [currentLocation, setCurrentLocation] = useState<string>("Uvwie, Warri")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleSelectCurrentLocation = () => {
    setCurrentLocation("Effurun, PTI road Masojie")
  }
      
  return (
    <div>
        <section className='seeker-bg-image h-[calc(100vh-200px)] md:h-[calc(100vh-85px)] w-full'>
            <div className='flex flex-col gap-y-6 items-center justify-center z-10 absolute top-0 left-0 h-full w-full'>
                <div className=' w-full max-w-[980px] flex flex-col gap-y-8 md:gap-y-20'>
                    <div>
                        <h1 className='text-sm md:text-2xl xl:text-4xl text-center font-bold text-white'>LOOKING FOR SERVICE PROVIDERS <br  /> NEAR YOU?</h1>
                    </div>
                    <div className='flex flex-col gap-y-24 lg:gap-y-9'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                            <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-primary-1 rounded relative after:content-[""] after:w-3 after:h-3 lg:after:w-6 lg:after:h-6 after:bg-primary-1 after:absolute after:-bottom-[4px] lg:after:-bottom-[5px] after:left-[40%] after:rotate-45'></div>
                            <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                            <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                        </div>
                        <div>
                            <div className='flex flex-col items-center gap-y-4 bg-[#ffffff7b] p-4 lg:px-20 lg:py-6 rounded'>
                                <h1 className='text-xl font-bold text-white'>Select service</h1>
                                <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
                                    <DropdownSelect />
                                    <Button size="lg" type='submit'>Search</Button>
                                </div>
                                <Dialog>
                                    <DialogTrigger className="self-start w-full">
                                        <div className='bg-[#ffffffc0] gap-0 self-start px-4 py-1 rounded hover:bg-white hover:shadow-md transition-all cursor-pointer w-full'>
                                            <p className='text-sm text-start'>{currentLocation}</p>
                                            <div className='flex items-center gap-2'>
                                                <FaMapLocationDot className="w-4 h-4 text-primary-1" />
                                                <p className='text-sm text-primary-1'>Edit Your Location</p>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <div className='sm:max-w-md'>
                                            <DialogHeader>
                                            <DialogTitle>
                                                <div className='flex items-end gap-2'>
                                                    <MdLocationPin className="w-8 h-8 text-primary-1" />
                                                    <p className='text-xl text-primary-1 font-semibold'>Service Location</p>
                                                </div>
                                                <p className='text-black-1 text-base text-start mt-2'>Enter location of desired services</p>
                                            </DialogTitle>
                                            <DialogDescription>
                                                <div className='relative'>
                                                    <Input value={searchText} onChange={handleChange} type='text' name='address' placeholder='Enter address' />
                                                    {
                                                        searchText.length > 1 &&
                                                        <div className='absolute top-[120%] rounded p-2 bg-white w-full left-0 border border-black-2'>
                                                            <h1 className='mb-2'>PLACES</h1>
                                                            <ul className='text-lg font-light text-black-1'>
                                                                {
                                                                    ["warri, dsc round-about","warri, Ebrumede secondary school","warri, Ugbomro, girls hostel. Delta state", "warri, Ugbomro, federal university petroleum university"].map((address) => (
                                                                            <li key={address} onClick={() => setCurrentLocation(address)}>
                                                                                <DialogTrigger className='flex items-center gap-2'>
                                                                                    <MdLocationPin className="w-3 h-3 text-primary-1" />
                                                                                    <p className='text-[14px] text-black-2 hover:text-black-1 transition-all cursor-pointer'>{address}</p>
                                                                                </DialogTrigger>
                                                                            </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                                <DialogTrigger onClick={handleSelectCurrentLocation}  className='bg-[#ffffffc0] mt-6 px-4 py-1 rounded-md flex flex-col self-start hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer w-full'>
                                                        <div className='flex items-center gap-2 justify-center md:justify-start w-full'>
                                                            <FaMapLocationDot className="w-4 h-4 text-primary-1" />
                                                            <p className='text-sm text-primary-1'>Current Location</p>
                                                        </div>
                                                        <p className='text-xs text-center md:text-start text-black-1 font-light w-full'>Tap to select your current location</p>
                                                </DialogTrigger>
                                            </DialogDescription>
                                            </DialogHeader>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <main className='px-3 sm:px-4 lg:px-12'>
            <section className='py-10 sm:py-16 lg:py-32 lg:pb-48 flex flex-col gap-y-10 md:gap-y-20'>
                <h1 className='text-center text-3xl lg:text-5xl text-black-1'>Featured Categories</h1>
                <div className='grid grid-cols-3 sm:grid-cols-4 grid-rows-3 sm:grid-rows-2 max-h-[400px] sm:max-h-[620px] gap-2 xl:gap-6'>
                    <div className='row-span-1 col-span-2 sm:col-span-1 bg-black-2 relative'>
                    <Image src='/assets/images/catering.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>FOOD & CATERING</p>
                        </div>
                    </div>
                    <div className='row-span-1 col-span-1 bg-black-2 relative'>
                        <Image src='/assets/images/lifestyle.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>LIFESTYLE</p>
                        </div>
                    </div>
                    <div className='row-span-1 col-span-1 sm:col-span-2 bg-black-2 relative'>
                    <Image src='/assets/images/health.png' className='block w-full h-full object-cover' alt='logo' width={650} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>HEALTH</p>
                        </div>
                    </div>
                    <div className='row-span-1 col-span-2 bg-black-2 relative'>
                    <Image src='/assets/images/engineering.png' className='block w-full h-full object-cover' alt='logo' width={650} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>ENGINEERING</p>
                        </div>
                    </div>
                    <div className='row-span-1 col-span-2 sm:col-span-1 bg-black-2 relative'>
                    <Image src='/assets/images/entertainment.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>ENTERTAINMENT</p>
                        </div>
                    </div>
                    <div className='row-span-1 col-span-1 bg-black-2 relative'>
                    <Image src='/assets/images/fashion.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                        <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                            <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>FASHION</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-10 sm:py-16 xl:pb-48 flex flex-col gap-y-10 md:gap-y-20'>
                <h1 className='text-center text-3xl lg:text-5xl text-black-1'>Popular Service Providers Near You</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-3 lg:gap-6'>
                    {
                        [1,2,3,4,5,6,7,8,9].map((item) =>(
                            <div className='shadow-md rounded pb-3 hover:bg-slate-50 hover:scale-95 cursor-pointer duration-500' key={item}>
                                <div className='overflow-hidden w-full'>
                                    <Image src='/assets/images/mama-ada.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                                </div>
                                <div className='flex flex-col gap-2 items-start justify-start p-3'>
                                    <h1 className='capitalize text-black-1 font-medium text-sm sm:text-base lg:text-xl truncate max-w-full'>Mama ada tailoring shop</h1>
                                    <div className='flex items-start gap-1'>
                                        <p className='text-xs lg:text-base font-normal text-primary-1'>Available: </p>
                                        <p className='text-xs lg:text-base font-normal text-black-2'>Monday to Saturdays 9am to 6pm</p>
                                    </div>
                                    <div className='flex items-start gap-1'>
                                        <p className='text-xs lg:text-base font-normal text-primary-1'>Payment: </p>
                                        <p className='text-xs lg:text-base font-normal text-black-2'>Base on service rendered</p>
                                    </div>  
                                    <div className='flex items-center gap-1'>
                                    <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                    <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                    <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                    <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                    <StarIcon width={15} height={15} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </main>
    </div>
  )
}

export default Seeker