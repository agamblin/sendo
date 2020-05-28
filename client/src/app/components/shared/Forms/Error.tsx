import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/core';

interface IProps {
    message: string;
}

export const FormError: React.FC<IProps> = React.memo(({ message }) => {
    return (
        <Alert status='error' variant='subtle'>
            <AlertIcon />
            {message}
        </Alert>
    );
});
