"use client";

import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { ExternalLink, Filter, FilterIcon, FilterXIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



interface Images {
  id: number;
  url: string;
}

interface DataType {
  id: number;
  images: Images[];
  price: number;
  name: string;
  description: string;
}
export default function Home() {
  const [data, setData] = useState<DataType[]>([]);
  const [data1,setData1]=useState([])

  async function getProducts() {
    try {
      const response = await fetch(
        "https://admin-dashboard-eight-ebon.vercel.app/api/products"
      );
      
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setData(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    getProducts()
    
  });
  return (
    <div className="w-screen mt-3  px-1 lg:px-3">
      <div className="w-full flex justify-between">
        <h1 className="ml-8 lg:ml-14  font-bold text-3xl ">
          Featured Products
        </h1>
      </div>

      <div className="w-full flex flex-wrap mt-3  justify-center items-center">
        {data.map((a) => (
          <Card
            key={a.id}
            className=" max-w-[300px] max-h-[300px]  m-3  "
          >
            <CardHeader className="absolute z-10 top-0 flex-col w-1/32 items-start bg-white rounded-md border-0 text-black ">
              <p className="text-tiny  uppercase font-bold">
                {a.name}
              </p>
              <h4 className=" font-medium text-xs">₹{a.price}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src={a.images[0].url}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black  text-xs">{a.description}</p>
              </div>
              <Button
                className="text-tiny  px-2"
                color="warning"
                variant="faded"
                radius="full"
                size="sm"
              >
                View Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
