import React from 'react'
import CategoryShowCase from './category-show-case'



export default function CategoryProducts() {
  return (
    <div className='flex flex-col justify-center mt-10'>
         <div className="flex flex-col  justify-center ">
         <h1 className="text-xl font-semibold ">Explore the Collections</h1>
         </div>
         <CategoryShowCase/>

    </div>
  )
}
