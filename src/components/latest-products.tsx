"use client";
import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "./ui/custom-arrows";
import LatestProductsLoader from "./loading/latest-products-loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Slider from "react-slick";
import Image from "next/image";
import { Button } from "./ui/button";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";

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

  var settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplaySpeed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
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
      <section className="lg:-ml-9 w-full ml-9 ">
        {loading ? (
          <div className="flex justify-center  ">
            <LatestProductsLoader />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-auto ">
            {data.map((a) => (
              <div key={a.id}>
                <Card className="p-3 border-0  overflow-hidden">
                  <CardHeader>
                    <CardTitle>{a.name}</CardTitle>
                    <CardDescription>{a.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-40 lg:w-52  ">
                      <Slider {...settings}>
                        {a.images.map((img) => (
                          <div
                            className="flex justify-center items-center"
                            key={img.id}
                          >
                            <Image
                              alt={a.name}
                              src={img.url}
                              width={300}
                              height={200}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-5  items-center">
                    <p className="font-semibold text-sm">Price: ₹{a.price}</p>
                    <Button  size={"sm"} className="text-sm">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
