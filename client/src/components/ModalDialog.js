import React, { useRef } from 'react';

import utils from '../modules/utils';

import './css/ModalDialog.css';

function ModalDialog(props) {

    const {
        maxWidth = '60vw',
        onSaveHandle   = ()=>{},
        onCancelHandle = ()=>{},
        onDeleteHandle = ()=>{},
        isNew = false
    } = props;

    let title = props?.title || props?.reg?.name || 'R & M';
    let actions = props?.actions || ['close'];

    const refModalBody = useRef(null);

    function dummyButtonHandle(){
        
        let modalBody = refModalBody.current;

        Array.from(modalBody.querySelectorAll('input')).map(async el => {
        
            if(
                !['file', 'button'].includes(el.getAttribute('type')) &&
                el.value == ''
            ){
                el.setAttribute('value', utils.loremRandomWord());
            }

        })
    }

    return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-hidden="true">

            <div className="ModalDialog modal-dialog modal-dialog-centered" role="document" style={{maxWidth}}>
                
                <div className="modal-content">
                    
                    <div className="modal-header">

                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    
                    </div>

                    <div ref={refModalBody} className="modal-body">
                        {props.children}
                    </div>
                    
                    <div className="ModalCustomFooter">
                    
                        <div className='float-left'>
                            { actions.includes('dummy')  && <button onClick={dummyButtonHandle} type="button" className="btn btn-sm btn-secondary">Dummy</button> }
                            { actions.includes('delete') && <button onClick={onDeleteHandle} type="button" className="btn btn-sm btn-danger">Eliminar</button> }
                        </div>
                    
                        <div className='float-right'>
                            { actions.includes('cancel') && <button onClick={onCancelHandle} type="button" className="ml-2 btn btn-sm btn-secondary">Cancelar</button> }
                            { actions.includes('ok')     && <button type="button" className="ml-2 btn btn-sm btn-primary" data-dismiss="modal">OK</button> }
                            { actions.includes('close')  && <button type="button" className="ml-2 btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button> }
                            { actions.includes('save')   && <button onClick={()=>onSaveHandle(isNew)} type="button" className="ml-2 btn btn-sm btn-primary">Guardar</button> }
                        </div>
                    
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ModalDialog;
