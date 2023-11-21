import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

export default function SearchInput() {
  return (
    <div className='flex mt-6  relative'>
        <Input className='lg:w-1/2 ' type='text' placeholder='Search for Products...'  />
        <Search className='absolute top-2 lg:left-[47%] left-[90%]  sm:left-[95%]'/>
    </div>
  )
}
