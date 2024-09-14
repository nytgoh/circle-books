import React from "react";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

interface TextFieldProps {
    fieldName: string;
    label?: string;
    placeHolder: string;
    helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({fieldName, label, placeHolder, helperText}) => {
    return (<FormField
        name={fieldName}
        render={({field}) => (
            <FormItem>
                {label != undefined && <FormLabel>{label}</FormLabel>}
                <FormControl>
                    <Input className="border-softBeige bg-offWhite"
                           placeholder={placeHolder} {...field} />
                </FormControl>
                {helperText != undefined && <FormDescription>{helperText}</FormDescription>}
                <FormMessage className="text-red-500"/>
            </FormItem>
        )}
    />);
}

export default TextField;