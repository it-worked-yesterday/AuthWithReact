import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Routes from './app_router';

const App = () => (
    <Routes />
);

document.body.style.backgroundColor = "#fafafa";
ReactDOM.render(<App />, document.getElementById('root'));