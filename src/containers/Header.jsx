
import React, { useContext, useState } from 'react';
import useActions from '@hooks/useActions';
import { exportConfig } from '@hooks/useSaveConfig';
import AppContext from '@context/AppContext';
import '@styles/Header.scss'

const Header = () => {
    const {state:{keys}} = useContext(AppContext);
    let loggerToggle = false;

    const keyLogger = (e) => {
        let keyConf = keys.find(k => k.key == e.key);
        useActions(keyConf);
    }

    return (
        <header>
            <button
                onClick={e => {
                    loggerToggle = !loggerToggle;

                    if (loggerToggle) 
                    {
                        document.addEventListener('keydown', keyLogger);
                        e.target.className += ' active';
                    }
                    else {
                        document.removeEventListener('keydown', keyLogger);
                        e.target.className = 'header--button';
                    }
                }}
                className="header--button">Key logger</button>
            <button
                onClick={() => useActions({type:'stop'})}
                className="header--button">Stop</button>
            <button
                onClick={() => exportConfig(keys)}
                className="header--button">Export</button>
        </header>
    );
}

export default Header;