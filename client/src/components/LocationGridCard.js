import React from 'react';
import { Link } from 'react-router-dom';

import './css/LocationGridCard.css';

function LocationGridCard({reg}){
    console.log({reg});

    return (
        <div className='LocationGridCard card'>
            <a target='_blank' href={`http://localhost:7000/locations/${reg.id}`}>
            <div 
                className="no-CardImage"
            >
                {reg.starring.map(ch => {
                    return <img style={{float: 'left', width: '50%', height: 'auto'}} src={ch} />
                })}
            </div>
            </a>
            <div className="CardDetails">
                    <div className="fw-bold mb-1">
                        <a target='_blank' href={`http://localhost:7000/Locations/${reg.id}`}>
                            {reg.name}
                        </a>
                    </div>
                    <div>{reg.type}</div>
                    <div>
                        <small className='text-muted'>Dimensión</small><br/>
                        {reg.dimension}
                    </div>
            </div>
        </div>
    )
}

export default LocationGridCard;