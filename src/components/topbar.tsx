"use client";
import { useState, useEffect } from "react";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import CategoriesView from "./categories-view";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Topbar() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <Link href="/" className="text-xl font-bold">
          SNX
        </Link>
      </NavbarContent>
      <NavbarContent justify="center">
        <CategoriesView />
      </NavbarContent>
      <NavbarContent justify="end">
        <Button>
          Sell
          <Plus />
        </Button>
      </NavbarContent>
      
    </Navbar>
  );
}
