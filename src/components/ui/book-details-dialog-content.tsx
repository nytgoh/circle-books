import React from "react";
import Image from 'next/image'
import {Image as ImageIcon} from 'lucide-react';
import {DialogContent, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useCart} from "@/context/cart-context";
import {Book} from "@/models/book";
import ImageAccessor from "@/components/assets/image-accessor";

interface BookDetailsDialogContentProps {
    book: Book;
}

export const BookDetailsDialogContent: React.FC<BookDetailsDialogContentProps> = ({book}) => {
    const {addToCart} = useCart();
    
    const tryGetImage = (title: string, id: number) => {
        try {
            const image = ImageAccessor[id];
            if (image == undefined) throw new Error()
            return <Image
                className="h-96 w-auto mr-4 mt-10"
                src={image}
                width={500}
                height={500}
                alt={title}
            />;
        } catch (err) {
            return <div className="h-96 w-64 bg-softBeige flex justify-center items-center rounded mr-4 mt-10">
                <ImageIcon className="w-auto h-10"/>
            </div>
        }
    };


    return (
        <DialogContent className="sm:max-w-[425px]">
            <div>
                <div className="mb-9 flex items-center justify-center">
                    {tryGetImage(book.title, book.id)}
                </div>
                <div className="text-center">
                    <div className="text-lg text-darkBlue">{book.title}</div>
                    <div className="text-xs text-terracotta">{book.author}</div>

                    <div className="text-xs text-darkBlue mt-5">ISBN: {book.isbn}</div>
                    <div className="text-xs text-darkBlue mb-5">Stock: {book.availableStock}</div>
                </div>
            </div>
            <DialogFooter className="flex flex-col items-center gap-5">
                ${book.price}

                <Button onClick={() => addToCart(book)}>
                    Add to Cart
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default BookDetailsDialogContent;
