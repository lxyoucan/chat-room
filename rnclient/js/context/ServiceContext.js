/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

export const ServiceContext = createContext();

export const ServiceProvider = props => {
    const [serviceData, setServiceData] = useState([]);

    return (
        <ServiceContext.Provider value={[serviceData, setServiceData]}>
            {props.children}
        </ServiceContext.Provider>
    );
};
