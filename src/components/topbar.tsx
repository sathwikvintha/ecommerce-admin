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

import { cn } from "@/lib/utils";
import CategoriesView from "./categories-view";

export default function Topbar() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="center">
        <NavbarBrand>
          <p className="font-bold ">SNX</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="start">
        <CategoriesView />
      </NavbarContent>
    </Navbar>
  );
}
