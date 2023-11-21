import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function LatestProductsLoader() {
  const loaderArray = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
      {loaderArray.map((_, index) => (
        <Card key={index} className="p-3 border-0 overflow-hidden">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-[150px]" />
            </CardTitle>

            <CardDescription>
              <Skeleton className="h-4 w-[100px]" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-48 lg:w-60">
              <Skeleton className=" aspect-square overflow-hidden rounded-xl " />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-6 items-center">
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-8 w-[70px]" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
