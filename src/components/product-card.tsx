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
    <div >
      <Card className="p-3 border-0  overflow-hidden">
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <ImageSlider urls={urls}/>
        </CardContent>
        <CardFooter className="flex gap-5  items-center">
          <p className="font-semibold text-sm">Price: ₹{data.price}</p>
          <Button size={"sm"} className="text-sm">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
