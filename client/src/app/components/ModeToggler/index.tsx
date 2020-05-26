import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/core';
import { FaMoon, FaRegMoon } from 'react-icons/fa';

interface IProps {}

export const ModeToggler: React.FC<IProps> = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            aria-label='toggle dark mode or light mode'
            onClick={toggleColorMode}
            icon={colorMode === 'dark' ? FaMoon : FaRegMoon}
        />
    );
};
