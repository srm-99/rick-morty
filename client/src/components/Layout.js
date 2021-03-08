import React from 'react';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import MenuBar from './MenuBar';
import Content from './Content';
import SideBar from './SideBar';
import ContentBody from './ContentBody';

import './css/Layout.css';

function Layout({ title, sideBarMenu, routes }) {

    return (

        <div className='Layout'>

            <MenuBar title={title} />

            <MemoryRouter>

                <Content>

                    <SideBar menuConfig={sideBarMenu} />

                    <ContentBody>

                        <CacheSwitch>

                            {
                                routes.map((route, i) => {

                                    return (
                                        <CacheRoute key={i} path={route.route}>
                                            {route.page}
                                        </CacheRoute>
                                    )

                                })
                            }

                            <Redirect to={routes[0].route} />

                        </CacheSwitch>

                    </ContentBody>

                </Content>

            </MemoryRouter>
        </div>
    )
}

export default Layout;