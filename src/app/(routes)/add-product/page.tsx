"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AddProductPageProps {}

const FormSchema = z.object({
  price: z.number().positive("Value must be a positive number"),
  description: z
    .string()
    .min(10, "Description must be more than 10 characters")
    .max(100, "Description must be less than 100 characters"),
  name: z
    .string()
    .min(3, "Product Name must be at least 3 characters")
    .max(20, "Product Name must be less than 20 characters"),
  images: z.object({ url: z.string() }).array(),
  phoneNo: z.number().positive("Phone Number must not negative"),
  email: z.string().email("INVALID EMAIL"),
});

const defaultValues = {
  name: "",
  images: [],
  email: "",
  phoneNo: 0,
  price: 0,
  description: "",
};

async function onSubmit(productData: z.infer<typeof FormSchema>) {
  try {
    console.log(productData);
  } catch (error: any) {
    console.log(error.message);
  }
}

const AddProductPage: FC<AddProductPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  return (
    <div className="w-screen h-auto flex items-center justify-center mt-5">
      
      <Form {...form}>
        <form
          className="w-2/3 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="test@test.com" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  placeholder="999999999"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Product</FormLabel>
                <Input placeholder="Mama Earth" {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    placeholder="in Rupees"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      
    </div>
  );
};

export default AddProductPage;
