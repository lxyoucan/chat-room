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
    const [allRoom,setAllRoom] = useState([]);
    // 为了邀请群成员，能立即生效，所以使用全局变量
    const [roomUsers,setRoomUsers] = useState([]);
    //当前用户所加的群列表
    const [myRoomList,setMyRoomList] = useState([]);

    return (
        <ConfigContext.Provider value={[serverUrl,setServerUrl,allRoom,setAllRoom,roomUsers,setRoomUsers,myRoomList,setMyRoomList]}>
            {props.children}
        </ConfigContext.Provider>
    );
};
