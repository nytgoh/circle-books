'use client'

import Stepper from "@/components/ui/stepper";
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import {CreditCard, Landmark, WalletCards} from "lucide-react";
import {CheckoutHeader} from "@/components/ui/checkout-header";
import TextField from "@/components/ui/text-field";

// Define schema for form validation using Zod
const formSchema = z.object({
    option: z.enum(['visa', 'google', 'paypal'], {
        errorMap: () => ({message: 'Please select a payment method.'}),
    }),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
})
    .refine((data) => {
        if (data.option === 'visa') {
            return !!data.cardNumber;
        }
        return true;
    }, {
        message: 'Card number is required for Visa.',
        path: ['cardNumber'],
    })
    .refine((data) => {
        if (data.option === 'visa') {
            return !!data.expiry;
        }
        return true;
    }, {
        message: 'Expiry is required for Visa.',
        path: ['expiry'],
    })
    .refine((data) => {
        if (data.option === 'visa') {
            return !!data.cvc;
        }
        return true;
    }, {
        message: 'CVC is required for Visa.',
        path: ['cvc'],
    })
    .refine((data) => {
        if (data.option === 'visa') {
            return data.cardNumber?.length === 16;
        }
        return true;
    }, {
        message: 'Card number must be 16 digits.',
        path: ['cardNumber'],
    });

type FormValues = z.infer<typeof formSchema>;

export default function PaymentDetailsRoute() {
    const router = useRouter()

    let defaultValues: FormValues = {
        option: 'visa',
        cardNumber: '',
        expiry: '',
        cvc: '',
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues, // Initialize with empty values
    });

    // Extract form reset function
    const {reset} = form;

    useEffect(() => {
        // Run only once to load data from localStorage
        const storedDetails = localStorage.getItem('paymentDetails');
        if (storedDetails != null) {
            const values: FormValues = JSON.parse(storedDetails);
            reset(values); // Update the form with the loaded values
        }
    }, [reset]);

    const onSubmit = (data: FormValues) => {
        const paymentDetails = {
            option: data.option,
            cardNumber: data.cardNumber,
            expiry: data.expiry,
            cvc: '', // security
        };

        // Save shipping details to LocalStorage
        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        router.push('/review')
    };

    return (
        <div>
            <div>
                {/* Centered text */}
                <CheckoutHeader title={"Checkout"}/>
                <Stepper currentStep={1}/>

                <div className="text-center mt-10 mb-5">
                    <h1 className="text-xl text-darkBlue">Payment Details</h1>
                </div>
                <div className="flex justify-center items-center w-full">
                    <div className="w-full max-w-lg mx-auto p-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Shipping Method with border selection */}
                                <FormField
                                    name="option"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="items-left space-y-4 w-full">
                                                    <div
                                                        className={`cursor-pointer pink-rounded-container space-x-4 ${
                                                            field.value === 'visa' ? 'border-terracotta' : 'border-softBeige'
                                                        }`}
                                                        onClick={() => field.onChange('visa')}
                                                    >
                                                        <CreditCard/>
                                                        <p className="text-sm font-bold">Visa / Credit Card</p>
                                                    </div>

                                                    {field.value == 'visa' && <div className="space-y-3">
                                                        <TextField fieldName={"cardNumber"}
                                                                   placeHolder={"xxxxxxxxxxxxxxxx"}
                                                                   label={"Card Number"}/>
                                                        <TextField fieldName={"expiry"} placeHolder={"MM/YY"}
                                                                   label={"Expiry"}/>
                                                        <TextField fieldName={"cvc"} placeHolder={"xxx"} label={"CVC"}/>
                                                    </div>}

                                                    <div
                                                        className={`cursor-pointer pink-rounded-container space-x-4 ${
                                                            field.value === 'google' ? 'border-terracotta' : 'border-softBeige'
                                                        }`}
                                                        onClick={() => field.onChange('google')}
                                                    >
                                                        <WalletCards/>
                                                        <p className="text-sm font-bold">Google Pay</p>
                                                    </div>

                                                    <div
                                                        className={`cursor-pointer pink-rounded-container space-x-4 ${
                                                            field.value === 'paypal' ? 'border-terracotta' : 'border-softBeige'
                                                        }`}
                                                        onClick={() => field.onChange('paypal')}
                                                    >
                                                        <Landmark/>
                                                        <p className="text-sm font-bold">Paypal</p>
                                                    </div>
                                                </div>

                                            </FormControl>
                                            <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <div className="flex flex-col items-center space-y-4">
                                    <Button className="text-[16px] min-w-[150px]" type="submit">
                                        Continue
                                    </Button>
                                    <Link className="text-xs underline font-bold" href="../">Back to Browse</Link>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

