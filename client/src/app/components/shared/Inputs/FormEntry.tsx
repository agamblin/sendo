import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
} from '@chakra-ui/core';
import { FiMail, FiLock, FiPenTool } from 'react-icons/fi';

type InputType = 'text' | 'number' | 'email' | 'password';

interface IProps {
    type: InputType;
    placeholder: string;
    label: string;
    helper?: string;
}

const getIcon = (type: InputType) => {
    switch (type) {
        case 'email':
            return <FiMail />;
        case 'password':
            return <FiLock />;
        default:
            return <FiPenTool />;
    }
};

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
                <InputGroup>
                    <InputLeftElement
                        color='gray.400'
                        children={
                            meta.asyncValidating ? (
                                <Spinner size='xs' />
                            ) : (
                                getIcon(type)
                            )
                        }
                    />
                    <Input
                        variant='flushed'
                        borderColor='gray.400'
                        placeholder={placeholder}
                        id={input.name}
                        type={type}
                        {...(input as any)}
                    />
                </InputGroup>
                {helper && (
                    <FormHelperText id='email-helper-text'>
                        {helper}
                    </FormHelperText>
                )}
                <FormErrorMessage position='absolute'>
                    {meta.error}
                </FormErrorMessage>
            </FormControl>
        );
    }
);
