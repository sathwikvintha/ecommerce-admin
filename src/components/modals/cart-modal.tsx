import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

interface CartModalProps {}

const CartModal: FC<CartModalProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="cursor-pointer">
          <ShoppingCart />
          <span className="ml-2">0</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Items</SheetTitle>
          <SheetDescription>
            <div>
              <Button>Check out</Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartModal;
