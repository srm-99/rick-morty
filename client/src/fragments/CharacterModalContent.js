import React, {useState} from 'react';

import './css/CharacterModalContent.css';

function CharacterModalContent({reg}){
    const [editing, setEditing] = useState(false);
    return (
        <div className='CharacterModalContent d-flex flex-row'>
            <div className='pl-2 pr-2'>
                <small>IMAGEN</small>
                <img className='ModalMainImage' src={reg.image} />
            </div>
            <div className='Details pl-3 pr-2 pb-3'>
                {Object.keys(reg).map((k, i) => {
                    let value = '';
                    if(typeof reg[k] === 'object'){
                        value = JSON.stringify(reg[k]);
                    } else {
                        value = reg[k];
                    }
                    return (
                        <div className='mb-2' key={i}>
                            <small>{k.toUpperCase()}</small>
                            <div className='card'>
                                {editing ? (
                                    <input 
                                        type='text'
                                        className='form-control'
                                        defaultValue = {value}
                                    />
                                ) : (
                                    <div className='card-text p-1 pt-2 pb-2' style={{minHeight: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap'}}>
                                        <big>
                                            {value}
                                        </big>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CharacterModalContent;