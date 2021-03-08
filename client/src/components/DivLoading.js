import React from 'react';

import {Loader} from 'react-feather';

import './css/DivLoading.css';

function DivLoading({options = {}}) {

    const {
        size = '2.5rem'
    } = options;

    return (
    
        <div className='DivLoading'>
    
            <Loader size={size} />
    
        </div>
    
    )
}

export default DivLoading;
