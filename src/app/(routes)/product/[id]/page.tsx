"use client";

import AddToCartButton from "@/components/add-to-cart-button";
import ImageSlider from "@/components/image-silder";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import getProducts from "@/helpers/get-products";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const BREADCRUMBS = [{ id: 1, name: "Home", href: "/" }];

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

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [product, setProduct] = useState<RequestedProduct>();

  async function getProduct(params: any) {
    const data = await getProducts(params);
    setProduct(data[0]);
  }
  useEffect(() => {
    getProduct(params);
  });
  
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product?.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product?.price || 0)}
                </p>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product?.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">Verfied</p>
              </div>
            </section>
          </div>
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider
                urls={product?.images?.map((element) => element.url) || []}
              />
            </div>
          </div>
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
