import React, { useEffect, useState } from 'react';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';

import EpisodeGridCard from '../components/EpisodeGridCard';
import Pagination from '../components/Pagination';
import { Switch } from 'react-router-dom';

function EpisodesPage() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(async () => {
        loadEpisodes();
        let currentPage = document.location.search;
        console.log(currentPage); 
    }, []);

    async function loadEpisodes(page=1){
        setData([]);

        let url = `http://localhost:7000/episodes/?page=${page}`;
        
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
        
        data.forEach(async (ep, i) => {
            data[i].starring = [];
            ep.characters.slice(-4).map(async ch => {
                let idCh = ch.split('/').slice(-1)[0];
                data[i].starring.push(`https://rickandmortyapi.com/api/character/avatar/${idCh}.jpeg`);
            })
        })
        
        setInfo(info);
        setData(data);
        setPage(page);
    }

    function renderCardHandle(reg, i){
        return (
            <EpisodeGridCard reg={reg} key={i}/>
        )
    }

    return (
        <ContentPage>
            <legend>Episodios <small>({info.count})</small></legend>
            <CardsGrid data={data} renderCardHandle={renderCardHandle}/>
            <Switch>
                <Pagination current={page} info={info} pagingHandle={loadEpisodes}/>
            </Switch>                
        </ContentPage>
    )
}

export default EpisodesPage;
