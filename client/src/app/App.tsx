import React from 'react';
import {
    ThemeProvider,
    CSSReset,
    ColorModeProvider,
    Box,
} from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';

import { basicTheme } from 'styles';
import { routes } from 'app/config';
import { ModeToggler } from './components';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={basicTheme}>
            <ColorModeProvider>
                <CSSReset />
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </ColorModeProvider>
        </ThemeProvider>
    );
};
