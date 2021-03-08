import React from 'react';
import {Link} from 'react-router-dom';

import './css/SideBar.css';

function SideBar({menuConfig}) {
    
    return (
        
        <div className='SideBar p-0 pt-4'>

            <ul className="nav flex-column">

                {
                    menuConfig.map((menu, i) => {
                        
                        return (
                        
                            <li key={i} className="nav-item">

                                <Link className="nav-link" to={menu.route}>
                                    {menu.icon}
                                    <span className='pl-3'>{menu.text}</span>
                                </Link>
                            
                            </li>
                        
                        )
                    })
                }

            </ul>
        
        </div>
    )
}

export default SideBar;
