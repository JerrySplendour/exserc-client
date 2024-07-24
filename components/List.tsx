import { ListProps } from '@/types';
import React, { FC } from 'react'
import ListItem from './ListItem';

const List: FC<ListProps> = ({items, setSelected}) => {

  return (
    <ul
    className='pl-5 '
    >
      {
          items.map((item) => (
            <ListItem setSelected={setSelected} key={item.id} item={item} />
          ))
      }
    </ul>
  )
}

export default List