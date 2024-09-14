// src/context/CartContext.tsx
"use client";

import {createContext, ReactNode, useContext, useState} from 'react';
import {Book} from "@/models/book";

export type CartItem = {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    quantity: number;
    availableStock: number;
};

interface CartContextProps {
    cartItems: CartItem[];
    cartItemCount: number;
    addToCart: (item: Book) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const addToCart = (book: Book) => {
        const item = {
            id: book.id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            price: book.price,
            quantity: 1,
            availableStock: book.availableStock,
        };

        if (book.availableStock == 0) {
            alert("This book is out of stock.");
        }

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                );
            }
            return [...prevItems, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const cartTotal = cartItems.reduce((count, item) => count + item.price, 0);

    return (
        <CartContext.Provider value={{cartItems, cartItemCount, addToCart, removeFromCart, clearCart, cartTotal}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
