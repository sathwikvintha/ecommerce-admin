import { Dice1, Plus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import CartModal from "./modals/cart-modal";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="px-14 py-4 border flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl">
        SLX
      </Link>
      <div className="flex items-center gap-5">
        <Link href="/" className="font-bold">Contact Us</Link>
        <Link href="/add-product" className={buttonVariants()}>
          Sell
          <Plus className="w-4 h-4 ml-2" />
        </Link>

        <CartModal/>
      </div>
    </div>
  );
};

export default Navbar;
