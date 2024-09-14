'use client'

import Stepper from "@/components/ui/stepper";
import CartListing from "@/components/ui/cart-listing";
import React, {useEffect, useState} from "react";
import {useCart} from "@/context/cart-context";
import {CreditCard, Landmark, WalletCards} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CheckoutHeader} from "@/components/ui/checkout-header";
import {useRouter} from "next/navigation";

export default function ConfirmationRoute() {
    const router = useRouter()
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

    const [error, setError] = useState('')

    const {cartItemCount, cartItems, cartTotal} = useCart();

    useEffect(() => {
        const shippingDetails = localStorage.getItem('shippingDetails');
        if (shippingDetails)
            setShipping(JSON.parse(shippingDetails))

        console.log(shippingDetails)

        const paymentDetails = localStorage.getItem('paymentDetails');
        if (paymentDetails)
            setPayment(JSON.parse(paymentDetails))
    }, []);

    const onSubmit = async () => {
        try {
            const response = await fetch(`/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItems),
            });

            if (!response.ok)
                throw new Error(response.statusText + ": " + (await response.text()))

            router.push('/confirmation')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div>
            <div>
                <CheckoutHeader title={"Checkout"}/>
                <Stepper currentStep={2}/>

                <div className="text-center mt-10 mb-5">
                    <h1 className="text-xl text-darkBlue">Review</h1>
                </div>

                <div className="flex justify-center my-10">
                    <div className="flex flex-col space-y-5 items-center">
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

                        <div className="text-center">Total: ${cartTotal}</div>
                        <Button onClick={onSubmit} className="text-[16px] min-w-[150px]"
                                disabled={cartItemCount == 0}>Pay</Button>
                        {error.length > 0 && <p className="text-red-500">{error}</p>}
                        <Link className="text-xs underline font-bold" href="../">Back to Browse</Link>
                    </div>
                </div>


            </div>
        </div>
    );
}
