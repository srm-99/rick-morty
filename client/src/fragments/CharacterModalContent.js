import React, { useState, useRef, useEffect } from 'react';

import './css/CharacterModalContent.css';

function CharacterModalContent({ reg, isWritable, isNew }) {

    const [mainImage, setMainImage] = useState('https://rickandmortyapi.com/api/character/avatar/19.jpeg');

    const [imgSrc, setImageSrc] = useState(reg.image);

    const refImage = useRef(null);
    const refHiddenImage = useRef(null);

    if (isNew) {
        let newReg = {};
        Object.keys(reg).forEach(key => {
            if (key == 'image') {
                newReg[key] = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
            } else {
                if (key !== 'id') {
                    newReg[key] = '';
                }
            }
        });
        reg = newReg;
    } else {
    }

    useEffect(() => {
        setMainImage(reg['image']);
    }, [reg]);

    function imageClickHandle() {
        refImage.current.click();
    }

    function imageLoadHandle(evt) {
        let tgt = evt.target,
            files = tgt.files
            ;

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                //setImageSrc(fr.result);
                setMainImage(fr.result);
                refHiddenImage.current.setAttribute('value', fr.result);
            }
            fr.readAsDataURL(files[0]);
        } else {
            console.log('ERROR');
        }
    }

    return (

        <div className='CharacterModalContent d-flex flex-row'>

            <div className='pl-2 pr-2'>

                <small>IMAGEN</small>
                <img onClick={imageClickHandle} className='ModalMainImage' src={mainImage} />
                <input ref={refImage} onChange={imageLoadHandle} className='d-none' type='file' name='imageFile' />
            
            </div>

            <div className='Details pl-3 pr-2 pb-3'>

                <form id={isNew ? 'newCharacterCrudForm' : 'characterCrudForm'}>

                    {
                        Object.keys(reg).map((k, i) => {

                            let value = '';

                            if (typeof reg[k] === 'object') {
                                value = JSON.stringify(reg[k]);
                            } else {
                                value = reg[k];
                            }

                            let hideField = false;
                            let inputType = 'text';

                            if (k === 'id') {
                                inputType = 'hidden';
                                hideField = true;
                            }

                            return (

                                k == 'image' ? (
                                    <input
                                        key={i}
                                        ref={refHiddenImage}
                                        name='image'
                                        type='hidden'
                                        defaultValue={mainImage}
                                    />
                                ) : (
                                    !hideField ? (
                                        <div className='mb-2' key={i}>
                                            
                                            <small>{k.toUpperCase()}</small>

                                            {
                                                isWritable ? (
                                                    <input
                                                        name={k}
                                                        type={inputType}
                                                        className='form-control'
                                                        defaultValue={value}
                                                    />

                                                ) : (
                                                    
                                                    <div className='ReadonlyControl card-text'>
                                                        {value}
                                                    </div>
                                                )
                                            }

                                        </div>

                                    ) : (
                                        
                                        <input
                                            key={i}
                                            name={k}
                                            type={inputType}
                                            className='form-control'
                                            value={value}
                                            onChange={()=>{}}
                                        />
                                    )
                                )

                            )
                        })
                    }

                </form>
            </div>
        </div>
    )
}

export default CharacterModalContent;