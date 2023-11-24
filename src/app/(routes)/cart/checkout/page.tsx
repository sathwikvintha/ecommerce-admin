"use client";
import Image from "next/image";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { sendCheckout } from "@/actions/send-checkout";
import { Toaster, toast } from "sonner";

const CheckoutPage = () => {
  const { items, removeItem, clearCart } = useCart();

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const FormSchema = z.object({
    images: z.object({ url: z.string() }).array(),
    userphoneNo: z.string().min(10).max(10),
  });

  const defaultValues = {
    images: [],
    userphoneNo: "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const handleButtonClick = async (id: any) => {
    try {
      const { images, userphoneNo } = form.getValues();
      if (userphoneNo.length !== 10) {
        toast.error("Please enter phone number");
      } else if (images.length === 0) {
        toast.error("Please send payment screenshot");
      } else {
        const products = items.filter((item) => item.product.id === id);
        const { email, name, phoneNo } = products[0].product;
        const ownerPhoneNo = phoneNo;
        sendCheckout(
          id,
          email,
          name,
          userphoneNo,
          images[0]?.url,
          ownerPhoneNo
        );
        toast.success("Product owner details is sent your indox");
        removeItem(id)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative lg:min-h-full ">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">Payment Process</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for visting
            </h1>

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order details</div>
              <div className="mt-2 text-gray-900"></div>

              <ul
                className={cn({
                  "divide-y divide-gray-200 border-b border-t border-gray-200":
                    isMounted && items.length > 0,
                })}
              >
                {isMounted &&
                  items.map(({ product }) => {
                    const image = product.images[0];

                    return (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    href={`/product/${product.id}`}
                                    className="font-medium text-gray-700 first-letter:uppercase hover:text-gray-800"
                                  >
                                    Product: {product.name}
                                  </Link>
                                </h3>
                              </div>

                              <Form {...form}>
                                <form className="space-y-6 w-full">
                                  <FormField
                                    control={form.control}
                                    name="userphoneNo"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Your Phone Number</FormLabel>
                                        <Input
                                          placeholder="999999999"
                                          {...field}
                                        />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Please send payment of screenshot of{" "}
                                          {formatPrice(product.price)} to{" "}
                                          {product.phoneNo}{" "}
                                        </FormLabel>
                                        <FormControl>
                                          <ImageUpload
                                            value={field.value.map(
                                              (image) => image.url
                                            )}
                                            onChange={(url) =>
                                              field.onChange([
                                                ...field.value,
                                                { url },
                                              ])
                                            }
                                            onRemove={(url) =>
                                              field.onChange([
                                                ...field.value.filter(
                                                  (current) =>
                                                    current.url !== url
                                                ),
                                              ])
                                            }
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </form>
                              </Form>
                              <Button
                                className="mt-3"
                                onClick={() => handleButtonClick(product.id)}
                              >
                                Submit
                              </Button>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                              <div className="absolute right-0 top-0">
                                <Button
                                  aria-label="remove product"
                                  onClick={() => removeItem(product.id)}
                                  variant="ghost"
                                >
                                  <X className="h-5 w-5" aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">{formatPrice(cartTotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-gray-900">{formatPrice(fee)}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(cartTotal + fee)}</p>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-center" duration={5000} closeButton />
    </main>
  );
};

export default CheckoutPage;
