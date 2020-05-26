import React from 'react';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';

import { routes, basicTheme } from 'app/config';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={basicTheme}>
            <CSSReset />
            <Box as='main' width='100vw' height='100vh' position='relative'>
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </Box>
        </ThemeProvider>
    );
};
