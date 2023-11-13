import React from "react";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center lg:px-32 px-10 gap-6  mt-24">
      <p className="text-black lg:text-7xl text-3xl font-[600] text-center">
        Exchange and connect <hr className="w-0"/> your campus <span className="text-[#2663e7]">your deals</span> 
      </p>
      <p className="text-gray-600 text-[0.75rem] lg:text-lg text-center">Welcome to SNX. Every product on our platform is verified by our team to <hr  className="w-0 hidden lg:flex"/> ensure our highest quality standards</p>
      <div className="flex gap-3 items-center">
        <Button>View Products</Button>
        <Button className="flex items-center gap-2 font-semibold group " variant={"link"}>
            Become Seller <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-all "/>
        </Button>
      </div>
    </div>
  );
}
