import React from 'react';

import Layout from './Layout';

import './css/App.css';

function App({ config }) {

    const {
        app,
        routes
    } = config;

    return (
        <div className='App'>

            <Layout
                title={app.title}
                sideBarMenu={app.sideBarMenu}
                
                routes={routes}
            />

        </div>
    )
}

export default App;
