import React from 'react';
import { Flex, Heading, Image } from '@chakra-ui/core';

import spendoIcon from 'assets/icon-dark.png';

interface IProps {
    title: string;
}

export const HeaderIcon: React.FC<IProps> = React.memo(({ title }) => {
    return (
        <Flex align='center' px={8} py={10}>
            <Heading size='lg' fontWeight='semibold' mr='auto'>
                {title}
            </Heading>
            <Image src={spendoIcon} alt='Spendo Icon' h='48px' />
        </Flex>
    );
});
