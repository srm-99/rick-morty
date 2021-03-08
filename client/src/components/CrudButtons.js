import React from 'react';

import './css/CrudButtons.css';

function CrudButtons({newRecordHandle}){
    
    return (
    
        <div className='CrudButtons'>

            <button
                onClick={newRecordHandle}
                className='btn btn-sm btn-secondary text-nowrap'
            >
                Crear nuevo registro
            </button>
        
        </div>
    
    )
}

export default CrudButtons;
