import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Hero() {
  const { isAuthenticated } = getKindeServerSession();
  const isLogin = await isAuthenticated();
  return (
    <div className="flex flex-col justify-center items-center  gap-6  ">
      <h1 className="text-black lg:text-7xl text-3xl font-[600] text-center">
        Exchange and connect. <hr className="w-0" /> Your campus{" "}
        <span className="text-[#2663e7]">your deals</span>
      </h1>
      <h1 className="text-gray-600 text-[0.75rem] lg:text-lg text-center">
        Welcome to SNX. Every product on our platform is verified by our team to{" "}
        <hr className="w-0 hidden lg:flex" /> ensure our highest quality
        standards
      </h1>
      {isLogin ? (
        <div className="flex gap-3 items-center">
          <Button>View Products</Button>
          <Link
            href="/add-product"
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex items-center gap-2 font-semibold group"
            )}
          >
            Become Seller{" "}
            <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-all " />
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <LoginLink className={buttonVariants()}>Sign in</LoginLink>

          <RegisterLink
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex items-center gap-2 font-semibold group"
            )}
          >
            Create a account
            <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-all " />
          </RegisterLink>
        </div>
      )}
    </div>
  );
}
