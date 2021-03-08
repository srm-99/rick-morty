import React from 'react';

import CharactersPage from '../pages/CharactersPage';
import LocationsPage  from '../pages/LocationsPage';
import EpisodesPage   from '../pages/EpisodesPage';

const routesConfig = [
    {
        "route": '/characters',
        "page": <CharactersPage />
    },
    {
        "route": '/characters/p/:page',
        "page": <CharactersPage />
    },
    {
        "route": '/locations',
        "page": <LocationsPage />
    },
    {
        "route": '/episodes',
        "page": <EpisodesPage />
    }
]

export default routesConfig;