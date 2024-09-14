// pages/api/books.ts

import {NextApiRequest, NextApiResponse} from 'next';
import {Book} from "@/components/models/book";

const EXTERNAL_API_URL = "https://mocki.io/v1/5436fc35-0560-45dc-ac04-25f56ad392e3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(EXTERNAL_API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        const books = await response.json();

        // Get the searchText query param
        const {searchText} = req.query;

        let filteredBooks = books;

        if (searchText) {
            const searchLower = (searchText as string).toLowerCase();

            filteredBooks = filteredBooks.filter((book: Book) =>
                book.author.toLowerCase().includes(searchLower) ||
                book.title.toLowerCase().includes(searchLower)
            );
        }

        res.status(200).json(filteredBooks);
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Type guard to check if err is an instance of Error
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: "An unknown error occurred"});// Fallback for other error types
        }
    }
}
