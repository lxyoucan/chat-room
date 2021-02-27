/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';
import {SERVER_URL} from "../constants/Config";
export const ConfigContext = createContext();
/**
 * 保存app的基本配置信息
 * 比如：服务器的连接地址
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const ConfigProvider = props => {
    //服务器端连接地址
    const [serverUrl,setServerUrl] = useState(SERVER_URL);

    return (
        <ConfigContext.Provider value={[serverUrl,setServerUrl]}>
            {props.children}
        </ConfigContext.Provider>
    );
};
