import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    <Link href={`/product/${data.id}`} >
      <Card className=" border-0  mt-6 p-3 overflow-hidden cursor-pointer hover:scale-105 transition-all">
        <CardContent>
            <ImageSlider urls={urls}/>
        </CardContent>
        <CardFooter className="flex flex-col -mt-3 justify-start items-start">
          <p className=" font-semibold">{data.name}</p>
          <p className="font-semibold text-sm">₹{data.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
