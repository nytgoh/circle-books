import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./dialog";
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/cart-context";
import {ShoppingCart} from "lucide-react";
import CartListing from "@/components/ui/cart-listing";
import Link from 'next/link';

export const CheckoutDialog = () => {
    const {cartItemCount, cartItems, cartTotal} = useCart();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* Cart Button with Badge */}
                <button
                    className="relative p-1 transform transition-transform duration-500 active:scale-75"
                >
                    <ShoppingCart className="h-10 w-10 text-darkBlue"/>
                    <span
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>

                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-9 flex items-center justify-center"><ShoppingCart
                        className="h-10 w-10 text-darkBlue mr-2"/>Cart</DialogTitle>
                    <DialogDescription className="min-h-[40vh] max-h-[60vh] overflow-y-auto">
                        {cartItemCount == 0 && "No items have been added to cart"}
                        {cartItemCount > 0 && cartItems.map(item => <CartListing key={item.id} item={item}/>)}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col items-center gap-2">
                    <div>Total: ${cartTotal}</div>
                    <Link href="/shipping" passHref>
                        <Button disabled={cartItemCount == 0}>Checkout</Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutDialog;
