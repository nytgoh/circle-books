"use client"
import TitleHeader from "@/components/ui/title-header";
import SearchBar from "@/components/ui/search-bar";
import {Book} from "@/models/book";
import {BookShelf} from "@/components/ui/bookshelf";
import {useEffect, useState} from "react";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
    }, []);

    const handleSearchChange = (value: string) => {
        setSearchValue(value); // Update search value from the SearchBar
    };

    const fetchBooks = async (searchText: string = "") => {
        setLoading(true);
        try {
            const response = await fetch(`/api/books?searchText=${encodeURIComponent(searchText)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(data || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(searchValue);
    }, [searchValue]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="relative h-screen">
            {/* Main Content */}
            <div
                className={`transition-opacity duration-400 opacity-100`}
            >
                <TitleHeader/> {/* Contains the header dialog */}
                <SearchBar onSearchChange={handleSearchChange}/>
                <BookShelf books={books}/>

                {loading && (<>
                        <div
                            className={`flex items-center justify-center`}>
                            Loading...
                        </div>
                    </>

                )}
            </div>
        </div>
    );
}
