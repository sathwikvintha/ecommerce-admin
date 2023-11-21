"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: any;
  name: string;
}

export default function CategoryShowCase() {
  const [data, setData] = useState<Category[]>([{ id: "", name: "" }]);
  const controls = useAnimation();

  async function getProducts() {
    try {
      const response = await fetch(
        "https://admin-dashboard-seven-bay.vercel.app/api/category"
      );
      const data = await response.json();
      console.log(data.message);
      setData(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
    controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
  }, [controls]);


  

  return (
    <motion.div
      className="w-full mt-6 -ml-4"
      initial={{ opacity: 0, x: -100 }}
      animate={controls}
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <motion.div className="flex w-max p-4 space-x-4">
          {data.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}


              className="shrink-0 "

            >
              <Badge
                variant={"secondary"}
                className=" shrink-0 py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-[#2663e7] transition  cursor-pointer"
              >
                {category.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}
