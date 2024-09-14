import React from 'react';
import Link from 'next/link';
import {Button} from './button'; // Custom Button
import {CheckCircle, DollarSign, Package} from 'lucide-react'; // Lucide icons

interface StepperProps {
    currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({currentStep}) => {
    const steps = [
        {path: '/shipping', icon: <Package size={20}/>, label: 'shipping'},
        {path: '/payment', icon: <DollarSign size={20}/>, label: 'payment'},
        {path: '/review', icon: <CheckCircle size={20}/>, label: 'review'},
    ];

    return (
        <div className="relative flex items-center justify-between w-[70vw] max-w-[500px] my-6 mx-auto">
            {/* First line between Shipping and Payment */}
            <div className="absolute left-[18%] w-[40vw] max-w-[120px] h-0.5 bg-darkPaleYellow z-0 transform"></div>

            {/* Second line between Payment and Confirmation */}
            <div
                className="absolute left-[60%] sm:left-[60%] w-[40vw] max-w-[120px] h-0.5 bg-darkPaleYellow z-0 transform"></div>

            {steps.map((step, index) => (
                <div key={step.path} className="flex flex-col items-center z-10">
                    {/* Circle with icon */}
                    <Link href={step.path} passHref>
                        <Button
                            className={`w-12 h-12 rounded-full ${
                                currentStep === index
                                    ? index === 0
                                        ? 'bg-terracotta'
                                        : index === 1
                                            ? 'bg-darkBlue'
                                            : 'bg-sageGreen'
                                    : 'bg-lightGray'
                            } text-white flex items-center justify-center shadow`}
                        >
                            {step.icon}
                        </Button>
                    </Link>
                    {/* Step label */}
                    <span className="mt-2 text-sm">{step.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
