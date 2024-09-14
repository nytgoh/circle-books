"use client"
import TitleHeader from "@/components/ui/title-header";
import SearchBar from "@/components/ui/search-bar";
import {Book} from "@/models/book";
import {BookShelf} from "@/components/ui/bookshelf";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [progress, setProgress] = useState(13);
    const [showContent, setShowContent] = useState(false); // New state for controlling visibility of content

    useEffect(() => {
    }, []);

    const handleSearchChange = (value: string) => {
        setSearchValue(value); // Update search value from the SearchBar
    };

    const fetchBooks = async (searchText: string = "") => {
        setLoading(true);
        setShowContent(false); // Hide content during loading
        try {
            const response = await fetch(`/api/books?searchText=${encodeURIComponent(searchText)}`);
            setProgress(60);
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setProgress(80);
            setBooks(data.books || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            const timer = setTimeout(() => {
                setProgress(100);
                setLoading(false);
                setTimeout(() => setShowContent(true), 300); // Delay showing the content for a smooth transition
            }, 1000);

            // Clear timeout if the component unmounts during the delay
            return () => clearTimeout(timer);
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
            {/* Progress Bar */}
            {loading && (
                <div
                    className={`flex items-center justify-center h-screen transition-opacity duration-500 ${!loading ? 'opacity-0' : 'opacity-100'}`}>
                    <Progress value={progress} className="w-[60%]"/>
                </div>
            )}
            {/* Main Content */}
            {!loading && (
                <div
                    className={`transition-opacity duration-400 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                >
                    <TitleHeader/> {/* Contains the header dialog */}
                    <SearchBar onSearchChange={handleSearchChange}/>
                    <BookShelf books={books}/>
                </div>
            )}
        </div>
    );
}
