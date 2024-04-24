import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from 'stripe'


export  async function POST(request:NextRequest){
    const requestBody=await request.json()
    const {items}=requestBody
    const filteredProducts = items.filter((prod:any) =>
        Boolean(prod.product.price)
      )
    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
        []

      filteredProducts.forEach((proc:any) => {
        line_items.push({
          price_data:{
            currency:"inr",
            product_data:{
                name:proc.product.name
            },
            unit_amount:proc.product.price*100!,
          },
          quantity: 1,
        })
      })

      


      
      console.log(line_items)

      try {
        const stripeSession =
          await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/checkout`,
            cancel_url: `http://localhost:3000/cart`,
            payment_method_types: ['card'],
            mode: 'payment',
            metadata: {
              userId: "null",
              orderId: "null",
            },
            line_items,
          })

        return NextResponse.json({ url: stripeSession.url })
      } catch (err) {
        console.log(err)
        return NextResponse.json({ url:null },{status:400})
      }
    

      
}