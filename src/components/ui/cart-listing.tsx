import {Image} from 'lucide-react';
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import React from "react";
import {CartItem} from "@/context/cart-context";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import BookDetailsDialogContent from "@/components/ui/book-details-dialog-content";

interface CartListingProps {
    item: CartItem;
}

export const CartListing: React.FC<CartListingProps> = ({item}) => {
    return (
        <Card className="w-full max-w-xs">
            <Dialog>
                <DialogTrigger className="text-left">
                    <CardContent className="flex items-start">
                        <div className="h-32 w-24 bg-softBeige flex justify-center items-center rounded mr-4">
                            <Image className="w-auto h-10"/>
                        </div>

                        <div className="flex flex-col">
                            <CardTitle className="text-xs text-darkBlue">{item.title}</CardTitle>
                            <div className="text-[0.625rem] text-terracotta">{item.author}</div>
                            <div className="text-sm text-darkBlue mt-2">${item.price} ({item.quantity})</div>
                        </div>
                    </CardContent>
                </DialogTrigger>
                <BookDetailsDialogContent book={{
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    isbn: item.isbn,
                    price: item.price,
                    availableStock: item.availableStock,
                }}/>
            </Dialog>

        </Card>
    );
};

export default CartListing;