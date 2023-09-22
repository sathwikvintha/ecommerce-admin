"use client";
import { FC, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface CategoriesProps {}
interface Category {
  id: number;
  name: string;
}

const CategoriesView: FC<CategoriesProps> = () => {
  const [data, setData] = useState<Category[]>([]);

  async function getCategory() {
    try {
      const response = await fetch(
        "https://admin-dashboard-eight-ebon.vercel.app/api/category"
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setData(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
  });

  return (
    <Sheet>
      <SheetTrigger>Categories</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Check The Latest Categories</SheetTitle>
          <SheetDescription className="flex flex-col gap-2">
            {data.map((item, index) => (
              <div key={item.id}>
                <Link className="w-full text-lg cursor-pointer " href="#">
                  {item.name}
                </Link>
              </div>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesView;
