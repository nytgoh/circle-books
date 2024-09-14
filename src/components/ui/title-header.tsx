"use client";

import {Menu} from 'lucide-react';
import CheckoutDialog from "@/components/ui/checkout-dialog";

export default function TitleHeader() {
    return (
        <div id="Header" className="flex items-center justify-between p-4 my-5">
            {/* Disabled Burger Menu */}
            <button className="p-2 text-gray-400 cursor-not-allowed">
                <Menu className="h-10 w-10"/> {/* Menu icon from lucide-react */}
            </button>

            {/* Centered text */}
            <div className="text-center cursor-default">
                <h1 className="text-4xl text-darkBlue">Circle</h1>
                <h2 className="text-3xl text-terracotta">Books</h2>
            </div>

            {/* Cart Button with DialogTrigger */}
            <CheckoutDialog/> {/* This contains the cart button and dialog */}
        </div>
    );
}
