import React from "react";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Hero from "@/components/hero";

export default function AuthPage() {
  return (
    <div className=" h-[90vh] overflow-y-hidden  px-12 lg:px-16 flex items-center justify-center">
       <Hero/>

    </div>
  );
}
