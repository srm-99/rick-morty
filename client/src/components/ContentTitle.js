import React from 'react';

function ContentTitle({title, total = 0, isCrud, newRecordHandle}) {
    return (
        <div className='d-flex flex-row'>
            <legend className='flex-grow-1 pb-2'>
                {title} {total > 0 && <small>({total})</small>}
            </legend>
            {isCrud && (
                <div>
                    <button
                        onClick={newRecordHandle}
                        className='btn btn-sm btn-secondary text-nowrap'
                    >
                        Crear nuevo Personaje
                    </button>
                </div>
            )}
        </div>
    );
}

export default ContentTitle;
