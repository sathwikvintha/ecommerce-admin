"use client"
import getProducts from '@/helpers/get-products'

import React, { useEffect } from 'react'

export default function ProductPage({params}:{params:{id:string}}) {
    console.log(params)


    async function getProduct(params:any){
        const data=await getProducts(params)
        console.log(data)

    }






    useEffect(()=>{
        getProduct(params)
    })
  return (
    <div>ProductPage</div>
  )
}
