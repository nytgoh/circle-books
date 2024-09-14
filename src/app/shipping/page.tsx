'use client'

import Stepper from "@/components/ui/stepper";
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import {CheckoutHeader} from "@/components/ui/checkout-header";
import TextField from "@/components/ui/text-field";

// Define schema for form validation using Zod
const formSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email address.'}),
    fullName: z.string().min(1, {message: 'Full name is required.'}),
    address: z.string().min(1, {message: 'Address is required.'}),
    shipping: z.enum(['standard', 'express'], {errorMap: () => ({message: 'Please select a shipping method.'})}),
});

type FormValues = z.infer<typeof formSchema>;


export default function ShippingDetailsRoute() {
    const router = useRouter()
    const defaultValues: FormValues = {
        email: '',
        fullName: '',
        address: '',
        shipping: 'standard',
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues, // Initialize with empty values
    });

    // Extract form reset function
    const {reset} = form;

    useEffect(() => {
        // Run only once to load data from localStorage
        const storedDetails = localStorage.getItem('shippingDetails');
        if (storedDetails != null) {
            const values: FormValues = JSON.parse(storedDetails);
            reset(values); // Update the form with the loaded values
        }
    }, [reset]);

    const onSubmit = (data: FormValues) => {
        const shippingDetails = {
            fullName: data.fullName,
            address: data.address,
            email: data.email,
            shippingOption: data.shipping,
        };

        // Save shipping details to LocalStorage
        localStorage.setItem('shipping', JSON.stringify(shippingDetails));
        router.push('/payment')
    };

    return (
        <div>
            <div>
                {/* Centered text */}
                <CheckoutHeader title={"Checkout"}/>
                <Stepper currentStep={0}/>

                <div className="text-center mt-10 mb-5">
                    <h1 className="text-xl text-darkBlue">Shipping Details</h1>
                </div>
                <div className="flex justify-center items-center w-full">
                    <div className="w-full max-w-lg mx-auto p-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <TextField fieldName={"email"} label={"Email"} placeHolder={"you@example.com"}
                                           helperText={"For receipt and confirmation"}/>
                                <TextField fieldName={"fullName"} label={"Full Name"} placeHolder={"John Doe"}/>
                                <TextField fieldName={"address"} label={"Address"} placeHolder={"1234 Main St"}/>

                                {/* Shipping Method with border selection */}
                                <FormField
                                    name="shipping"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Shipping Method</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-col items-center space-y-4 w-full">
                                                    {/* Standard Shipping */}
                                                    <div
                                                        className={`cursor-pointer justify-between pink-rounded-container ${
                                                            field.value === 'standard' ? 'border-terracotta' : 'border-softBeige'
                                                        }`}
                                                        onClick={() => field.onChange('standard')}
                                                    >
                                                        <div>
                                                            <p className="text-sm font-bold">Standard Shipping</p>
                                                            <p className="text-xs mt-1">Between 17 - 24 September</p>
                                                        </div>
                                                        <p className="text-sm font-bold">+$6.00</p> {/* Price on the far right */}
                                                    </div>

                                                    {/* Express Shipping */}
                                                    <div
                                                        className={`cursor-pointer justify-between pink-rounded-container ${
                                                            field.value === 'express' ? 'border-terracotta' : 'border-softBeige'
                                                        }`}
                                                        onClick={() => field.onChange('express')}
                                                    >
                                                        <div>
                                                            <p className="text-sm font-bold">Express Shipping</p>
                                                            <p className="text-xs mt-1">By September 17</p>
                                                        </div>
                                                        <p className="text-sm font-bold">+$14.00</p> {/* Price on the far right */}
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

