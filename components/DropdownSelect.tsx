"use client"

import React, { FC, useEffect, useRef, useState } from 'react'
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import List from './List'
import { DropdownProps, TreeNode } from '@/types'

const DropdownSelect: FC<DropdownProps> = ({selected, setSelected}) => {
    
    const [open, setOpen] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const data: TreeNode[] = [
        {
          id: 1,
          name: 'General Service',
          parentId:0,
          children: [
            {
              id: 2,
              name: 'Carpentary',
              parentId: 1,
              children: [
                { id: 3, name: 'Roofing Carpentary', parentId: 2 },
                { id: 4, name: 'Furniture Carpentary', parentId: 2 },
              ],
            },
            { id: 5, name: 'Barber', parentId: 1,
                children: [
                    { id: 6, name: 'Male Barber', parentId: 2 },
                    { id: 7, name: 'Female Barber', parentId: 2 },
                  ]
             },
          ],
        },
        { id: 8, name: 'Special Service', parentId: 0,
            children: [
                {id: 9, name: "Doctor", parentId: 8,
                    children: [
                        {id: 10, name: "General Doctor", parentId: 9},  
                        {id: 11, name: "Dentist", parentId: 9},
                        ]
                },
                {id: 12, name: "Engineer", parentId: 8, 
                    children: [
                        {id: 13, name: "Electrical Engineer", parentId: 12},
                        {id: 14, name: "Mechanical Engineer", parentId: 12},
                        ]
                }
            ]
         },
      ];

      
      
      useEffect(() => {
          const toggleOpen = (ele: any) => {
            const select = document.querySelector('#select')
            if(!select?.contains(ele.target)){
                setOpen(false);
              }
          }
        document.body.addEventListener('click', toggleOpen);
        return () => {
          document.body.removeEventListener('click', toggleOpen);
        };
      }, [open]);

  return (
    <div id='select'  className='flex flex-col gap-2 w-full relative'>
        {/* selected item */}
        <div className='flex items-center justify-between gap-1 bg-white p-2 w-full rounded-md' onClick={() => setOpen((val) => !val)}>
            <div className='text-black-2'>{(selected && <span className='text-black-1'>{selected}</span>) || 'select job category'}</div>
            {open ? (<TriangleUpIcon className='text-primary-1 w-6 h-6' />) : (<TriangleDownIcon className='text-primary-1 w-6 h-6' />)}
        </div>
        {/* dropdown items */}
        {
          open && (
              <div ref={dropdownRef}  className='p-2 bg-white rounded-md w-full h-fit absolute top-[115%] border-2 border-primary-1'>
                  <List setOpen={setOpen} setSelected={setSelected} items={data} />
              </div>
          )
        }
    </div>
  )
}

export default DropdownSelect