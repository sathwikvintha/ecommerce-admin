"use client";
import { useEffect, useState } from "react";
import LatestProductsLoader from "./loading/latest-products-loading";
import {MoveRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./product-card";

interface Item {
  id: number;
  name: string;
}

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

export default function LatestProducts() {
  const [data, setData] = useState<RequestedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  async function getProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://admin-dashboard-seven-bay.vercel.app/api/products"
      );
      const data = await response.json();
      setData(data.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="flex flex-col  justify-center ">
        <h1 className="text-xl font-semibold ">Brand new</h1>
        <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Explore more than 100+ products
        </p>
        <Link href="/" className=" flex items-center gap-2  text-sm text-[#2663e7] font-semibold group"><p className="hidden lg:flex">Shop the Collections</p> <MoveRight className=" h-4 w-4 mt-1 group-hover:translate-x-1 transition-all "/></Link>

        </div>
      </div>
      
      <section className="lg:-ml-9 w-full ">
        {loading ? (
          <div className="flex justify-center  ">
            <LatestProductsLoader />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   ">
            {data.map((data) => (
              <ProductCard data={data} key={data.id}/>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
