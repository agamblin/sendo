import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from '@chakra-ui/core';

interface IProps {
    type: 'text' | 'number' | 'email' | 'password';
    placeholder: string;
    label: string;
    helper?: string;
}

export const FormEntry: React.FC<IProps & WrappedFieldProps> = React.memo(
    ({ input, label, type, placeholder, helper, meta }) => {
        return (
            <FormControl isInvalid={meta.error && meta.touched && !meta.active}>
                <FormLabel
                    textTransform='uppercase'
                    fontSize='xs'
                    color='gray.400'
                    fontWeight='semibold'
                    htmlFor={input.name}
                >
                    {label}
                </FormLabel>
                <Input
                    borderColor='gray.400'
                    placeholder={placeholder}
                    id={input.name}
                    type={type}
                    {...(input as any)}
                />
                {helper && (
                    <FormHelperText id='email-helper-text'>
                        {helper}
                    </FormHelperText>
                )}
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        );
    }
);
