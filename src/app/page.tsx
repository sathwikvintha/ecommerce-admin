import CategoryProducts from "@/components/category-products";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import LatestProducts from "@/components/latest-products";
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
      <div className="flex flex-col justify-center  px-12 lg:px-16 mt-20 gap-5">
        <Hero />
        <LatestProducts />
        <CategoryProducts/>
        <Faq/>
        <Footer/>
      </div>
    </>
  );
}
