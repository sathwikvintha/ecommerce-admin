"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

interface Category {
  id: number;
  name: string;
}

export default function Topbar() {
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
    <Navbar isBordered>
      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold ">SNX</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="flex " justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {data.map((item, index) => (
          <NavbarMenuItem key={item.id}>
            <Link className="w-full" href="#" size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
