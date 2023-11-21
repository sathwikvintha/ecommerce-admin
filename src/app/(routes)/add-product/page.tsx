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
import { useRouter } from "next/navigation";
import {sendEmail} from "../../../actions/send-email"


interface AddProductPageProps {}

const FormSchema = z.object({
  price: z.number().positive("Value must be a positive number"),
  description: z
    .string()
    .min(10, "Description must be more than 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  name: z
    .string()
    .min(3, "Product Name must be at least 3 characters")
    .max(20, "Product Name must be less than 20 characters"),
  images: z.object({ url: z.string() }).array(),
  phoneNo: z.string(),
  email: z.string().email("INVALID EMAIL"),
});

const defaultValues = {
  name: "",
  images: [],
  email: "",
  phoneNo: "",
  price: 0,
  description: "",
};



const AddProductPage: FC<AddProductPageProps> = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const router=useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  async function onSubmit(productData: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      const response=await fetch("https://admin-dashboard-seven-bay.vercel.app/api/requestedProducts",{
        method: "POST",
        body:JSON.stringify(productData)
  
      })
      const data = await response.json();
      if(response.ok){
        sendEmail(productData.name,productData.email)
        
        router.push("/")
      }
    } catch (error: any) {
      console.log(error.message);
    }finally{
      setLoading(false)

    }
  }


  
  return (
    <div className="w-screen h-auto flex items-center justify-center mt-5">
      
      <Form {...form} >
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
                <Input placeholder="test@test.com" disabled={loading} {...field} />
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
                  placeholder="999999999"
                  {...field}
                  disabled={loading}
                 
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
                <Input  disabled={loading} placeholder="Mama Earth..." {...field} />
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
                    disabled={loading}
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
                  <Textarea  disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>Submit</Button>
        </form>
      </Form>
      
    </div>
  );
};

export default AddProductPage;
