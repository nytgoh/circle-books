import {Image as ImageIcon} from 'lucide-react';
import Image from 'next/image'
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import React from "react";
import {CartItem} from "@/context/cart-context";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import BookDetailsDialogContent from "@/components/ui/book-details-dialog-content";
import ImageAccessor from "@/components/assets/image-accessor";

interface CartListingProps {
    item: CartItem;
}

export const CartListing: React.FC<CartListingProps> = ({item}) => {

    const tryGetImage = (title: string, id: number) => {
        try {
            const image = ImageAccessor[id];
            if (image == undefined) throw new Error()
            return <Image
                className="h-32 w-24 rounded mr-4"
                src={image}
                width={500}
                height={500}
                alt={title}
            />;
        } catch (err) {
            return <div className="h-32 w-24 bg-softBeige flex justify-center items-center rounded mr-4">
                <ImageIcon className="w-auto h-10"/>
            </div>
        }
    };

    return (
        <Card className="w-full max-w-xs">
            <Dialog>
                <DialogTrigger className="text-left">
                    <CardContent className="flex items-start">
                        {tryGetImage(item.title, item.id)}

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