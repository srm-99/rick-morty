import React from 'react';

import {MapPin, Users, Video} from 'react-feather';

const appConfig = {

    version   : '1.0.0',       // no está en uso
    theme     : 'superhero',   // no está en uso
    crudEntity: 'characters',  // no está en uso
    
    title: 'Explorador API Rick & Morty - v.0.0.1 beta',
    
    sideBarMenu: [
        {
            icon: <Users />,
            text: 'Personajes',
            route: '/characters'
        },
        {
            icon: <MapPin />,
            text: 'Lugares',
            route: '/locations'
        },
        {
            icon: <Video />,
            text: 'Episodios',
            route: '/episodes'
        }
    ]

}

export default appConfig;