import React from 'react';

import CrudButtons from './CrudButtons';

function ContentTitle({title, total, isCrud, newRecordHandle}){

    return (

        <div className='d-flex flex-row'>
        
            <legend className='flex-grow-1 pb-2'>{title} <small>({total})</small></legend>
        
            { isCrud && <CrudButtons newRecordHandle={newRecordHandle}/> }
        
        </div>
    
    )
}

export default ContentTitle;
