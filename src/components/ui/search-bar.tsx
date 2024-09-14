import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

interface SearchBarProps {
    onSearchChange: (value: string) => void;
}

export default function SearchBar({onSearchChange}: SearchBarProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value); // Pass the input value to the parent
    };

    return (
        <div className="relative w-[50vw] max-w-[400px] mx-auto">
            <Input
                className="rounded-full bg-fadedPaleYellow shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] border-fadedPaleYellow
                   pr-10 focus:border-terracotta border transition-colors mt-[2vh]"
                placeholder="Search"
                onChange={handleInputChange}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-darkBlue"/>
        </div>
    );
}
