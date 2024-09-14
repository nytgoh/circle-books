'use client'

import CartListing from "@/components/ui/cart-listing";
import React, {useEffect, useState} from "react";
import {useCart} from "@/context/cart-context";
import {CreditCard, Landmark, WalletCards} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Confetti from "react-dom-confetti";
import {CheckoutHeader} from "@/components/ui/checkout-header";

export default function ConfirmationRoute() {
    const [shipping, setShipping] = useState<{
        email: string,
        fullName: string,
        address: string,
        shippingOption: 'standard' | 'express'
    }>({
        email: '',
        fullName: '',
        address: '',
        shippingOption: 'standard'
    })

    const [payment, setPayment] = useState<{
        option: 'visa' | 'google' | 'paypal',
        cardNumber: string,
        expiry: string,
        cvc: string,
    }
    >({
            option: 'visa',
            cardNumber: '',
            expiry: '',
            cvc: '',
        }
    )

    const {cartItemCount, cartItems, cartTotal} = useCart();

    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const shippingDetails = localStorage.getItem('shippingDetails');
        if (shippingDetails)
            setShipping(JSON.parse(shippingDetails))

        const paymentDetails = localStorage.getItem('paymentDetails');
        if (paymentDetails)
            setPayment(JSON.parse(paymentDetails))

        setShowConfetti(true);
    }, []);

    return (
        <div>
            <div>
                <CheckoutHeader title={"Confirmation"}/>

                <div className="flex justify-center my-10">
                    <div className="flex flex-col space-y-5 items-center">
                        <div className="justify-center items-center text-center mb-5">
                            <p className="text-[16px] max-w-[500px] text-darkBlue">Thanks for your order! (#123)</p>
                            <p className="text-[16px] max-w-[500px] text-darkBlue"> A confirmation email will be sent
                                shortly. Another email with your tracking link will be sent as soon as your order has
                                been sent out!</p>
                        </div>
                        <div
                            className="beige-rounded-container">
                            {cartItemCount == 0 && "No items have been added to cart"}
                            {cartItemCount > 0 && cartItems.map(item => <CartListing key={item.id} item={item}/>)}
                        </div>

                        <div
                            className="beige-rounded-container">
                            <div>Email: {shipping.email}</div>
                            <div>Full Name: {shipping.fullName}</div>
                            <div>Address: {shipping.address}</div>
                        </div>

                        {shipping.shippingOption === "standard" && <div
                            className={`justify-between cursor-default pink-rounded-container border-terracotta`}
                        >
                            <div>
                                <p className="text-sm font-bold">Standard Shipping</p>
                                <p className="text-xs mt-1">Between 17 - 24 September</p>
                            </div>
                            <p className="text-sm font-bold">+$6.00</p> {/* Price on the far right */}
                        </div>}

                        {shipping.shippingOption === "express" && <div
                            className={`justify-between cursor-default pink-rounded-container border-terracotta`}
                        >
                            <div>
                                <p className="text-sm font-bold">Express Shipping</p>
                                <p className="text-xs mt-1">By September 17</p>
                            </div>
                            <p className="text-sm font-bold">+$14.00</p> {/* Price on the far right */}
                        </div>}

                        {payment.option == 'visa' &&
                            <div
                                className="cursor-default pink-rounded-container space-x-4 border-terracotta">
                                <CreditCard/>
                                <p className="text-sm font-bold">Visa / Credit Card - ending
                                    in: {payment.cardNumber.slice(-4)}</p>
                            </div>
                        }

                        {payment.option == 'google' && <div
                            className="cursor-default pink-rounded-container space-x-4 border-terracotta">
                            <WalletCards/>
                            <p className="text-sm font-bold">Google Pay</p>
                        </div>}

                        {payment.option == 'paypal' && <div
                            className="cursor-default pink-rounded-container space-x-4 border-terracotta">
                            <Landmark/>
                            <p className="text-sm font-bold">Paypal</p>
                        </div>}

                        <Confetti active={showConfetti}/>

                        <div className="text-center">Total: ${cartTotal}</div>
                        <Link href="/" passHref>
                            <Button className="text-[16px] min-w-[150px]">Back to Home</Button>
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
}
