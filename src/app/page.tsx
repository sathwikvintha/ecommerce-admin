"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";

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

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-52 -right-7 cursor-pointer">
      <ChevronRight className="text-black" size={"20px"} />
    </div>
  );
};
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute top-52 -left-7 cursor-pointer">
      <ChevronLeft className="text-black" size={"20px"} />
    </div>
  );
};

interface Item {
  id: number;
  name: string;
}

export default function Home() {
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
    <>
      <div className="mt-5 ">
        <Hero/>
        {/* {loading ? (
          <div className="flex justify-center  items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : data.length > 0 ? (
          <div className="flex gap-x-5 gap-y-5 flex-wrap justify-center">
            {data.map((a) => (
              <div key={a.id}>
                <Card className="p-3   overflow-hidden">
                  <CardHeader>
                    <CardTitle>{a.name}</CardTitle>
                    <CardDescription>{a.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-40 lg:w-52 ">
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
                  <CardFooter className="flex justify-between gap-6 items-center">
                    <p className="font-semibold">Price: ₹{a.price}</p>
                    <Button>View Product</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p>No items</p>
        )} */}
      </div>
    </>
  );
}
