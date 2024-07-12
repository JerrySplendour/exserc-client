import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center px-7'>
      <div className='flex flex-col gap-y-16 items-center justify-center w-full'>
        <h1 className='text-black-1 text-2xl font-normal'>Register as</h1>
        <div className='flex items-center justify-between md:justify-center md:gap-x-16 w-full'>
          <div className='flex items-center justify-center flex-col'>
            <figure className='w-[100px] h-[90px] lg:w-[129px] lg:h-[119px]'>
              <Image src={'/assets/images/seeker.png'} alt='seeker' width={129} height={129}  className='w-full h-full object-contain block' />
            </figure>
            <Button variant="default" className='rounded-2xl rounded-ee-none rounded-es-none' size="sm" >
              <Link href="signup/seeker">
                Service Seeker
              </Link>
            </Button>
          </div>
          <div className='flex items-center justify-center flex-col'>
            <figure className='w-[100px] h-[90px] lg:w-[129px] lg:h-[119px]'>
              <Image src={'/assets/images/provider.png'} alt='provider' width={129} height={129}  className='w-full h-full object-contain block' />
            </figure>
            <Button variant="default" className='rounded-2xl rounded-ee-none rounded-es-none' size="sm" >
              <Link href="signup/provider">
                Service Provider
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp