import {Book} from "@/models/book";
import React from "react";
import BookListing from "@/components/ui/book-listing";

interface BookShelfProps {
    books: Book[];
}

export const BookShelf: React.FC<BookShelfProps> = ({books}) => {
    return (
        <div className="flex justify-center">
            <div
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 max-w-screen-lg">
                {books.map((book) => (
                    <BookListing key={book.id} book={book}/>
                ))}
            </div>
        </div>
    );
}

export default BookShelf;
