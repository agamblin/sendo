import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { requireLogin } from 'app/HOC';

interface IProps {}

const _HomePage: React.FC<IProps> = () => {
    return (
        <Box>
            <Text>Home Page</Text>
        </Box>
    );
};

export const HomePage = requireLogin(_HomePage);
