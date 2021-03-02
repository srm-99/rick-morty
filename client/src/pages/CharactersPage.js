import React, { useEffect, useRef, useState } from 'react';
import { Switch } from 'react-router-dom';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';
import Pagination from '../components/Pagination';
import ModalDialog from '../components/ModalDialog';

import CharacterModalContent from '../fragments/CharacterModalContent';
import CharacterGridCard from '../fragments/CharacterGridCard';

function CharactersPage() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);
    const [currentRegContent, setCurrentRegContent] = useState('');
    const [currentReg, setCurrentReg] = useState({});

    useEffect(async () => {
        loadCharacters();
        let currentPage = document.location.search;
        console.log(currentPage); 
    }, []);

    async function loadCharacters(page=1){
        setData([]);

        let url = `http://localhost:7000/characters/?page=${page}`;
        
        let jsonRslt = await fetch(url, {
                headers: {
                    token: '#TOKEN12345=='
                }
            })
            .then(rslt => rslt.json())
            .catch(err => {console.log({err})})
        ;
        
        let info = jsonRslt.info || {};
        let data = jsonRslt.results || [];
        setInfo(info);
        setData(data);
        setPage(page);
    }

    function clickCardHandle(reg){
        setCurrentReg(reg);
        let htmlReg = (
            <CharacterModalContent reg={reg} />
        );
        setCurrentRegContent(htmlReg);
        $('#charactersModal').modal();
    }

    function renderCardHandle(reg, i){
        return (
            <CharacterGridCard reg={reg} key={i} clickCardHandle={clickCardHandle}/>
        )
    }

    return (
        <ContentPage>
            <legend className='pb-2'>Personajes <small>({info.count})</small></legend>
            <CardsGrid data={data} renderCardHandle={renderCardHandle}/>
            <Switch>
                <Pagination current={page} info={info} pagingHandle={loadCharacters}/>
            </Switch>
            <ModalDialog
                title={`Personaje: ${currentReg.name}`}
                reg={currentReg}
                id='charactersModal' 
            >
                {currentRegContent}
            </ModalDialog>
        </ContentPage>
    )
}

export default CharactersPage;
