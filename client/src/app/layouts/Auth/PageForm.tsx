import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/core';
import { HeaderIcon } from 'app/components';

interface IProps {
    title: string;
    footer: JSX.Element;
}

export const PageForm: React.FC<IProps> = ({ children, title, footer }) => {
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
                <HeaderIcon title={title} />
                <Divider m={0} />
                {children}
            </Box>
            <Text mt={4} fontSize='sm' color='gray.400'>
                {footer}
            </Text>
        </Flex>
    );
};
