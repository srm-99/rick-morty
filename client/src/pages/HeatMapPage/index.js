import React from 'react';

// Components
import ContentPage from '../../components/ContentPage';
import ContentTitle from '../../components/ContentTitle';
import DivLoading from '../../components/DivLoading';
import HeatMapGraph from './HeatMapGraph';

// Hooks
import useCharacters from './hooks/useCharacters';

const HeadMapPage = () => {
    const {characters, meta} = useCharacters();

    return (
        <ContentPage>
            <ContentTitle title='Estadísticas' isCrud={false} />
            {meta.status === 'loading' ? (
                <DivLoading />
            ) : (
                <HeatMapGraph
                    characters={characters.characters}
                    maxCharacters={characters.maxCharacters}
                    maxEpisodes={characters.maxEpisodes}
                />
            )}
            {meta.error && <p>🤕 Lo sentimos, algo salió mal: {meta.error}</p>}
        </ContentPage>
    );
};

export default HeadMapPage;
