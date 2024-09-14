import React from "react";

interface CheckoutHeaderProps {
    title: string;

}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({title}) => {
    return (<div className="text-center my-10">
        <h1 className="text-4xl text-darkBlue cursor-default">{title}</h1>
    </div>);
}
