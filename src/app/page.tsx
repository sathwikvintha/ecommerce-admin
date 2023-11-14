
import Hero from "@/components/hero";
import LatestProducts from "@/components/latest-products";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center  px-12 lg:px-16 mt-20 gap-5">
        <Hero />
        <LatestProducts />
      </div>
    </>
  );
}
