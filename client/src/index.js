import React from 'react';
import ReactDOM from 'react-dom';

// -- REV - import 'bootswatch/dist/united/bootstrap.min.css'; // Added this :boom:
import App from './components/App';

import config from './config/config';

ReactDOM.render(
    <App config={config} />,
    document.getElementById('app')
);