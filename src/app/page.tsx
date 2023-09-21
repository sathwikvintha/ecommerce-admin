"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const dummy = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];
export default function Home() {
  return (
    <div className="w-screen mt-3  px-1 lg:px-3">
    <h1 className="ml-8 lg:ml-14  font-bold text-3xl ">Featured Products</h1>
   
      <div className="w-full flex flex-wrap mt-3  justify-center items-center">
        {dummy.map((a) => (
          <Card
            key={a.id}
            isFooterBlurred
            className="max-w-[300px] max-h-[300px]  m-3  "
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-black uppercase font-bold">
                Nike shoes
              </p>
              <h4 className="text-white/60 font-medium text-xs">₹12,000</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ca4c3078-7982-4c62-b85f-15bbd34794a0/air-jordan-6-retro-shoes-4m3b9d.png"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black  text-xs">
                  Nike Jordon 65 of Size 11(UK).
                </p>
                <p className="text-black text-tiny">used 3 months.</p>
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
