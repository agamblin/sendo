import React from 'react';
import { Box, Divider, Flex, Link, Text } from '@chakra-ui/core';

import { RegisterHeader } from 'app/layouts';
import { RegisterForm } from 'app/layouts/register/Form';

interface IProps {}

export const RegisterPage: React.FC<IProps> = () => {
    return (
        <Flex
            align='center'
            justify='center'
            size='full'
            bg='gray.50'
            direction='column'
        >
            <Box
                w='lg'
                borderWidth='1px'
                rounded='lg'
                overflow='hidden'
                shadow='lg'
                bg='white'
            >
                <RegisterHeader />
                <Divider m={0} />
                <RegisterForm />
            </Box>
            <Text mt={4} fontSize='sm' color='gray.400'>
                Already have an account ? <Link color='blue.500'>Sign in</Link>
            </Text>
        </Flex>
    );
};
