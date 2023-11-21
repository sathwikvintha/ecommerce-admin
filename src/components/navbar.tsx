import { Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Cart from "./cart-modal";

interface NavbarProps {
  isLogin: boolean;
}

const Navbar: FC<NavbarProps> = ({ isLogin }) => {
  return (
    <div className="px-14 py-4 border flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl">
        SNX
      </Link>
      <div className="flex items-center gap-5">
        <Link href="/" className="font-bold hidden lg:flex">
          Contact Us
        </Link>
        {isLogin ? (
          <>
            <Link href="/add-product" className={buttonVariants()}>
              Sell
              <Plus className="w-4 h-4 ml-2" />
            </Link>
            <Cart/>
          </>
        ) : (
          <LoginLink className={buttonVariants()}>Sign in</LoginLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
