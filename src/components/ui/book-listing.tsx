import {Image as ImageIcon} from 'lucide-react';
import Image from 'next/image'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Book} from "@/models/book";
import React from "react";
import {useCart} from "@/context/cart-context";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import BookDetailsDialogContent from "@/components/ui/book-details-dialog-content";
import ImageAccessor from "@/components/assets/image-accessor";

interface BookListingProps {
    book: Book;
}

export const BookListing: React.FC<BookListingProps> = ({book}) => {
    const {addToCart} = useCart();

    const tryGetImage = (title: string, id: number) => {
        try {
            const image = ImageAccessor[id];
            if (image == undefined) throw new Error()
            return <Image
                className="h-32 w-24 mx-auto rounded"
                src={image}
                width={500}
                height={500}
                alt={title}
            />;
        } catch (err) {
            return <div
                className="h-32 w-24 bg-softBeige flex justify-center mx-auto items-center rounded">
                <ImageIcon className="w-auto h-10"/>
            </div>;
        }
    };

    
    return (
        <>
            <Card className="w-36">
                {/* Make CardHeader the Dialog Trigger */}
                <Dialog>
                    <DialogTrigger asChild>
                    <CardHeader className="h-60 cursor-pointer">
                            <CardTitle>
                                {tryGetImage(book.title, book.id)}
                            </CardTitle>
                            <div className="text-xs text-darkBlue">{book.title}</div>
                            <div className="text-[0.625rem] text-terracotta">{book.author}</div>
                        </CardHeader>
                    </DialogTrigger>
                    <BookDetailsDialogContent book={book}/>
                </Dialog>

                <CardContent>
                    ${book.price}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={() => addToCart(book)}>
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default BookListing;
