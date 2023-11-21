import CategoryProducts from "@/components/category-products";
import Hero from "@/components/hero";
import LatestProducts from "@/components/latest-products";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { LogoutLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async  function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const session=await isAuthenticated();
  
  if(!session){
    redirect("/getting-started")
  }

  return (
    <>
      <MaxWidthWrapper >
        <Hero />
        <LatestProducts />
        <CategoryProducts/>
      </MaxWidthWrapper>
    </>
  );
}
