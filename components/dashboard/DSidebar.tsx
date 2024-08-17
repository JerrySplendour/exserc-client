"use client"

import React from 'react'
import Image from 'next/image'
import { cn, Dashboardlinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
  

const DSidebar = () => {
    const pathname = usePathname()

  return (
    <>
        <aside className="w-full">
            <div className="flex flex-col space-y-2 text-center sm:text-left pl-14 pt-10">
                <div>
                    <figure className='w-[160px]'>
                        <Image src='/assets/images/logo-1.png' className='block w-auto h-auto object-cover' alt='logo' priority width={160} height={50} />
                    </figure>
                </div>
                <div className='items-start flex-col flex pt-10'>
                        {
                            Dashboardlinks.map(({name, path, icon}) => (
                                <Link key={name} href={path} className={cn('text-[#3C3742] px-3 py-4 w-full flex justify-start gap-x-2 text-[20px] font-normal', {
                                    "font-medium bg-[#9A65CF4D]": path === pathname
                                })} >
                                    <div className='w-5 h-5 flex items-center justify-center pt-3'>
                                        <Image alt={`${icon} icon`} className='object-cover w-auto h-auto' priority width={18} height={18} src={`/assets/images/icons/${icon}`} />
                                    </div>
                                    <span>{name}</span>
                                </Link>
                            ))
                        }
                </div>
            </div>
        </aside>
    </>

  )
}

export default DSidebar