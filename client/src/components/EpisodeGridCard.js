import React from 'react';
import { Link } from 'react-router-dom';

import './css/EpisodeGridCard.css';

function EpisodeGridCard({reg}){
    console.log({reg});

    let statusColor = reg.status === 'Alive' ? 'text-success' :
                      reg.status === 'Dead' ? 'text-danger' : 'text-muted';
    return (
        <div className='EpisodeGridCard card'>
            <a target='_blank' href={`http://localhost:7000/episodes/${reg.id}`}>
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
                        <a target='_blank' href={`http://localhost:7000/episodes/${reg.id}`}>
                            {reg.name}
                        </a>
                    </div>
                    <div>{reg.episode}</div>
                    <div>
                        <small className='text-muted'>Fecha de emisión</small><br/>
                        {reg.air_date}
                    </div>
            </div>
        </div>
    )
}

export default EpisodeGridCard;