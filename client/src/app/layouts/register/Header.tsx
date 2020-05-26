import React from 'react';
import { Flex, Heading, Image } from '@chakra-ui/core';

import spendoIcon from 'assets/icon-dark.png';

interface IProps {}

export const RegisterHeader: React.FC<IProps> = () => {
    return (
        <Flex align='center' px={8} py={10}>
            <Heading size='lg' fontWeight='semibold' mr='auto'>
                Create an account
            </Heading>
            <Image src={spendoIcon} alt='Spendo Icon' h='48px' />
        </Flex>
    );
};
