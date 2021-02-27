/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';
import {LoginProvider} from './LoginContext';
import {ServiceProvider} from './ServiceContext';
import {ThemeProvider} from './ThemeContext';
import {ConfigProvider} from './ConfigContext';

export const AppContext = createContext();

export const AppProvider = props => {
    return (
        <ConfigProvider>
            <ThemeProvider>
                <ServiceProvider>
                    <LoginProvider>
                        <AppContext.Provider value={'root'}>
                            {props.children}
                        </AppContext.Provider>
                    </LoginProvider>
                </ServiceProvider>
            </ThemeProvider>
        </ConfigProvider>
    );
};
