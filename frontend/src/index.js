import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import {AppProvider} from 'store'
import Root from "pages"
import "antd/dist/antd.css"
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <Root/>
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

