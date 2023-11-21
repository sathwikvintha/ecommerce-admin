"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getProducts from "@/helpers/get-products";
import ProductCard from "./product-card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { buttonVariants } from "./ui/button";


interface Category {
  id: any;
  name: string;
}

export interface Images {
  id: number;
  url: string;
}

export interface RequestedProduct {
  id: number;
  name: string;
  images: Images[];
  description: string;
  email: string;
  phoneNo: string;
  price: string;
  categoryId?: any;
}

export default function CategoryShowCase() {
  const [categories, setCategories] = useState<Category[]>([{ id: "", name: "" }]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<RequestedProduct[]>([]);
  const controls = useAnimation();

  async function getCategories() {
    try {
      const response = await fetch("https://admin-dashboard-seven-bay.vercel.app/api/category");
      const data = await response.json();
      console.log(data.messsage);
      setCategories(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductsByCategory(categoryId: string) {
    const allProducts = await getProducts({});
    const categoryProduct = allProducts.filter((product: any) => product.categoryId === categoryId);
    setProducts(categoryProduct);
  }

  async function getProduct() {
    const allProducts = await getProducts({});
    setProducts(allProducts);
  }

  useEffect(() => {
    getCategories();
    getProduct();
    controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
  }, [controls]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    getProductsByCategory(categoryId);
  };

  return (
    <motion.div className="w-full mt-6 -ml-4" initial={{ opacity: 0, x: -100 }} animate={controls}>
      <ScrollArea className="w-full whitespace-nowrap">
        <motion.div className="flex w-max p-4 space-x-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`shrink-0 ${selectedCategory === category.id ? 'border-[#2663e7] border rounded-[1.5rem]' : ''} `}
              onClick={() => handleCategoryClick(category.id)}
            >
              <Badge
                variant={"secondary"}
                className={`shrink-0  py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-[#2663e7] transition cursor-pointer`}
              >
                {category.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center ">
            <Image src="https://res.cloudinary.com/dbtqwzdk0/image/upload/v1700559009/hello_zj36yg.png" alt="no products" height={300} width={300}/>
            <Link
            href="/add-product"
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex items-center gap-2 -mt-4 font-semibold group"
            )}
          >
            Add your Product here{" "}
            <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-all " />
          </Link>

          </div>
        ) : (
          products.map((data) => (
            <ProductCard data={data} key={data.id} />
          ))
        )}
      </div>
    </motion.div>
  );
}
