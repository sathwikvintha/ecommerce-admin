import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import ImageSlider from "./image-silder";
import Link from "next/link";

interface Images {
  id: number;
  url: string;
}

interface RequestedProduct {
  id: number;
  name: string;
  images: Images[];
  description: string;
  email: string;
  phoneNo: string;
  price: string;
  categoryId?: any;
}
export default function ProductCard({ data }: { data: RequestedProduct }) {
    var urls = data.images.map(function (element:any) {
        return element.url;
      });
  return (
    
      <Card className=" border-0  mt-6 p-3 overflow-hidden cursor-pointer transition-all">
        <CardContent>
            <ImageSlider urls={urls}/>
        </CardContent>
        <CardFooter className="flex flex-col -mt-3 justify-start items-start">
          <p className=" font-semibold">{data.name}</p>
          <p className="font-semibold text-sm">₹{data.price}</p>
          <Link href={`/product/${data.id}`} className="text-sm font-semibold text-[#266ce7]">View Product</Link>
        </CardFooter>
      </Card>
    
  );
}
