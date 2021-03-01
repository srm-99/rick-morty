import React, { useEffect, useState } from 'react';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';

import CharacterGridCard from '../components/CharacterGridCard';
import Pagination from '../components/Pagination';
import { Switch } from 'react-router-dom';

function CharactersPage() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);

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

    function renderCardHandle(reg, i){
        return (
            <CharacterGridCard reg={reg} key={i}/>
        )
    }

    return (
        <ContentPage>
            <legend>Personajes <small>({info.count})</small></legend>
            <CardsGrid data={data} renderCardHandle={renderCardHandle}/>
            <Switch>
                <Pagination current={page} info={info} pagingHandle={loadCharacters}/>
            </Switch>                
        </ContentPage>
    )
}

export default CharactersPage;
