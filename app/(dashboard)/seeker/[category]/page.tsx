"use client"

import { Button } from '@/components/ui/button'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Category = ({ params }: { params: { category: string } }) => {
    const router = useRouter()
  return (
    <div className='px-3 md:px-6'>
        <section className='py-4'>
            <div className='flex flex-col gap-3'>
                <p className='text-black-1 text-xl'>All Available Service</p>
                <div className='flex items-center justify-between'>
                    <p className='text-xl text-black-1'><span className='text-primary-1 capitalize'>{params?.category.replace("-", " ")}&apos;s</span> near you</p>
                    <Button onClick={() => router.back()} size="sm" type='button'>Back</Button>
                </div>
            </div>
        </section>
        <section className='flex flex-col gap-4 md:gap-8 py-4'>
            <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6 border-[1px] border-primary-1 rounded-2xl'>
                <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                    <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                </div>
                <Link href={`/seeker/${params.category}/ewewefwrfrrww`}  className='flex flex-1 flex-col gap-x-1'>
                    <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>Kelvin Patrick</p><span className='font-normal text-xs md:text-sm text-black-2'>5km away</span></div>
                    <div className='flex items-center text-black-2 font-semibold text-xs md:text-xl'>
                        <span>Rating: </span>
                        <div className='flex items-center gap-1'>
                            <StarFilledIcon width={15} height={15} className='text-primary-1 w-3 h-3 md:w-auto md:h-auto' />
                            <StarFilledIcon width={15} height={15} className='text-primary-1 w-3 h-3 md:w-auto md:h-auto' />
                            <StarFilledIcon width={15} height={15} className='text-primary-1 w-3 h-3 md:w-auto md:h-auto' />
                            <StarFilledIcon width={15} height={15} className='text-primary-1 w-3 h-3 md:w-auto md:h-auto' />
                            <StarIcon width={15} height={15} className='w-3 h-3 md:w-auto md:h-auto' />
                        </div>
                    </div>
                </Link>
                <div className='flex items-center gap-3'>
                    <Button size="rs" className='rounded-2xl border hidden md:flex' variant="outline">   
                        <Link href={`/seeker/${params.category}/ewewefwrfrrww`}>
                            Profile
                        </Link>
                    </Button>
                    <Button size="rs" className='rounded-2xl border' variant="outline">Book service</Button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Category