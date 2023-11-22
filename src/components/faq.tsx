import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

const content2 =
  "When you post about your product through the ecommerce website, you will receive a mail for waitlist, where our admin will receive the product details, he/she will go through it,  if they find the product legit they will approve the product after, that the product will be posted on our ecommerce website and you will receive a confirmation email regarding the same.";
const content =
  " SNX (Shiv Nadar Exchange) is a dedicated online marketplace exclusively for Shiv Nadar University students. This platform simplifies the process of buying and selling pre-owned items among students. . It's a safe, user-friendly, and eco-conscious solution designed to enhance campus life. Join SNX today and experience the convenience of student-centered commerce.";
export default function Faq() {
  return (
    <MaxWidthWrapper className="mt-6 mb-10">
      <h1 className="text-center text-3xl font-semibold">
        Frequently asked questions
      </h1>
      <Accordion type="single" className="mt-6" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold">What is SNX?</AccordionTrigger>
          <AccordionContent className="text-lg">{content}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" >
          <AccordionTrigger  className="text-xl font-semibold">Where can I sell my product</AccordionTrigger>
          <AccordionContent  className="text-lg">
            You can sell your product through our ecommerce website which can be
            accessed by the students of shiv nadar university, when you login
            into the website you will find an sell option or click{" "}
            <Link href="add-product" className="underline hover:text-blue-500">
              this link
            </Link>{" "}
            , where you need to add the product details and images of the
            product. If the admin finds the product legit he/she
            will approve it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger  className="text-xl font-semibold">How my product is verifed?</AccordionTrigger>
          <AccordionContent  className="text-lg">{content2}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </MaxWidthWrapper>
  );
}
