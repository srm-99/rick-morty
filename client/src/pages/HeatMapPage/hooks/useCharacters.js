import React, {useEffect, useState} from 'react';

// Utils
import {api, URL_API_RM} from './utils/api';
import {getEpisodeData} from './utils/getEpisodeData';

const useCharacters = () => {
    /**
     * We can have two states to save the data related to the characters
     * and the metadata to save the lifecycle of the component and possible errors.
     *  */
    const [data, setData] = useState({
        characters: [],
        maxCharacters: 0,
        maxEpisodes: 0,
    });
    const [meta, setMeta] = useState({status: 'idle', error: ''});

    const getCharacters = async () => {
        try {
            setMeta({status: 'loading', error: ''});

            // nextUrl will be updated on every request
            let nextUrl = URL_API_RM;
            const rawData = {};

            // I make the requests one by one because, if there were many requests, the PC could be overloaded
            while (nextUrl) {
                const {info, results} = await api(nextUrl);

                // On every request we must save or update the season and episodes information
                // Data will be grouped by season
                for (let episodeData of results) {
                    const {season, episode} = getEpisodeData(
                        episodeData.episode
                    );
                    rawData[season]
                        ? rawData[season].episodes.push({
                              id: episode,
                              name: episodeData.name,
                              charactersAmount: episodeData.characters.length,
                          })
                        : (rawData[season] = {
                              id: season,
                              episodes: [
                                  {
                                      id: episode,
                                      name: episodeData.name,
                                      charactersAmount:
                                          episodeData.characters.length,
                                  },
                              ],
                          });
                }
                // when the api response is null, finish the loop while
                nextUrl = info.next;
            }

            const dataToSet = Object.values(rawData);

            const maxCharacters = Math.max(
                ...dataToSet
                    .map((season) =>
                        season.episodes.map(
                            (episode) => episode.charactersAmount
                        )
                    )
                    .flat()
            );

            const maxEpisodes = Math.max(
                ...dataToSet.map((season) => season.episodes.length)
            );

            // Finally update the state
            setData({characters: dataToSet, maxCharacters, maxEpisodes});
            setMeta({status: 'loaded', error: ''});
        } catch (error) {
            setMeta({status: 'loaded', error});
        }
    };

    useEffect(() => {
        getCharacters();
    }, []);

    return {characters: data, meta};
};

export default useCharacters;
