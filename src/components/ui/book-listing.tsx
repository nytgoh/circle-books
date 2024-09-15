import {Image} from 'lucide-react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Book} from "@/models/book";
import React from "react";
import {useCart} from "@/context/cart-context";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import BookDetailsDialogContent from "@/components/ui/book-details-dialog-content";

interface BookListingProps {
    book: Book;
}

export const BookListing: React.FC<BookListingProps> = ({book}) => {
    const {addToCart} = useCart();

    return (
        <>
            <Card className="w-36">
                {/* Make CardHeader the Dialog Trigger */}
                <Dialog>
                    <DialogTrigger asChild>
                        <CardHeader className="h-60 cursor-pointer">
                            <CardTitle>
                                <div
                                    className="h-32 w-24 bg-softBeige flex justify-center mx-auto items-center rounded">
                                    <Image className="w-auto h-10"/>
                                </div>
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
