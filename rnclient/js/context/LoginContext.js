/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

export const LoginContext = createContext();

export const LoginProvider = props => {
    const [isLogin,setIsLogin] = useState(false);
    const [user,setUser] = useState({});

    return (
        <LoginContext.Provider value={[isLogin,setIsLogin,user,setUser]}>
            {props.children}
        </LoginContext.Provider>
    );
};
