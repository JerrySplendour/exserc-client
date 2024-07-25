import { ListItemProps } from '@/types';
import React, { FC, useEffect, useRef, useState } from 'react'
import List from './List';
import { cn } from '@/lib/utils';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';


const ListItem: FC<ListItemProps> = ({ item, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (contentRef.current) {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
      }
    }, [isOpen]);

    const handleSelectElement = () => {
      if(!item.children?.length) setSelected(item.name);
      toggleOpen()
    }

  return (
    <li
    >
      <div
      className={cn(' flex items-center gap-2 transition-all ease-linear max-h-full text-sm sm:text-base lg:text-lg p-1', {"font-medium": (item?.parentId % 2)})}
      >
        {(isOpen && item.children) ? (<TriangleDownIcon className='text-primary-1 w-6 h-6' onClick={toggleOpen}/>) : (<TriangleRightIcon className={cn('text-primary-1 w-6 h-6', {"text-white w-4": (!item.children)})}  onClick={toggleOpen}/>)}
        <p className='cursor-pointer' onClick={handleSelectElement}>{item.name}</p>
      </div>
        <div
        ref={contentRef}
        style={{height: isOpen ? '100%' : height}}
        className='transition-all overflow-auto ease-linear max-h-full'
        >
        {item.children && (
          <List setSelected={setSelected} items={item.children} />
        )}
        </div>
    </li>
  );
};

export default ListItem