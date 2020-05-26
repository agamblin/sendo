import { theme, DefaultTheme } from '@chakra-ui/core';

export const basicTheme: DefaultTheme = {
    ...theme,
    colors: {
        ...theme.colors,
    },
    fonts: {
        body: 'Open Sans, sans-serif',
        heading: 'Montserrat, serif',
        mono: 'Menlo, monospace',
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
    },
    fontWeights: {
        thin: 100,
        hairline: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    lineHeights: {
        normal: 'normal',
        none: '1',
        shorter: '1.25',
        short: '1.375',
        base: '1.5',
        tall: '1.625',
        taller: '2',
    },
    letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
    breakpoints: ['30em', '48em', '62em', '80em'],
};
