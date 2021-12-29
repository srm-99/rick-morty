import React, {useState, useCallback} from "react";

// Components
import Tooltip from "./Tooltip";

// Utils
import {getColor} from "./utils/getColor";

const HeatMapGraph = ({characters, maxCharacters, maxEpisodes}) => {
    const [tooltipState, setTooltipState] = useState({
        coordinates: {x: 0, y: 0},
        visible: false,
        info: {name: "", episode: "", season: ""},
        amount: 0,
    });

    const handleHover = useCallback((e, name, episode, season, amount) => {
        console.log({amount});
        setTooltipState({
            coordinates: {x: e.pageX, y: e.pageY},
            visible: true,
            info: {name, episode, season},
            amount,
        });
    }, []);

    const handleLeaveHover = useCallback(() => {
        setTooltipState({
            coordinates: {x: 0, y: 0},
            visible: false,
            info: {name: "", episode: "", season: ""},
            amount: 0,
        });
    }, []);

    return (
        <>
            {/* I used inline style for practical purposes */}
            <Tooltip
                coordinates={tooltipState.coordinates}
                visible={tooltipState.visible}
                info={tooltipState.info}
                amount={tooltipState.amount}
            />

            <h3>Gráfico de Calor (cantidad de personajes) </h3>
            <div style={{display: "flex"}}>
                <div style={{width: "40px", paddingTop: "200px"}}>
                    <h4
                        style={{
                            transform: "rotate(-90deg)",
                        }}
                    >
                        Temporadas
                    </h4>
                </div>
                <div>
                    <h4 style={{textAlign: "center", margin: "0"}}>
                        Episodios
                    </h4>
                    <div>
                        <div style={{display: "flex"}}>
                            <span
                                style={{
                                    textAlign: "center",
                                    width: "40px",
                                    height: "40px",
                                    margin: "0",
                                }}
                            ></span>
                            {[...new Array(maxEpisodes)].map((_, index) => (
                                <p
                                    key={`episode${index}`}
                                    style={{
                                        textAlign: "center",
                                        paddingTop: "5px",
                                        width: "40px",
                                        height: "40px",
                                        margin: "0",
                                    }}
                                >
                                    {index + 1}
                                </p>
                            ))}
                        </div>
                    </div>
                    {characters.map((season, index) => (
                        <div key={season.id} style={{display: "flex"}}>
                            <p
                                style={{
                                    margin: "0",
                                    width: "40px",
                                    height: "40px",
                                    textAlign: "center",
                                }}
                            >
                                {index + 1}
                            </p>

                            {season.episodes.map((episode) => (
                                <p
                                    key={`${season.id}-${episode.id}`}
                                    onMouseOver={(e) => {
                                        handleHover(
                                            e,
                                            episode.name,
                                            episode.id,
                                            season.id,
                                            episode.charactersAmount
                                        );
                                    }}
                                    onMouseLeave={handleLeaveHover}
                                    style={{
                                        backgroundColor: getColor(
                                            episode.charactersAmount,
                                            maxCharacters
                                        ),
                                        width: "40px",
                                        height: "40px",
                                        margin: "0",
                                    }}
                                ></p>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{marginLeft: "30px"}}>
                    <h4 style={{textAlign: "center", margin: "0"}}>Índice</h4>
                    <div style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p style={{textAlign: "center"}}>0</p>
                            <p
                                style={{
                                    backgroundColor: getColor(0, maxCharacters),
                                    width: "40px",
                                    height: "40px",
                                    margin: "0",
                                }}
                            ></p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p style={{textAlign: "center"}}>
                                {Math.floor(maxCharacters / 2)}
                            </p>
                            <p
                                style={{
                                    backgroundColor: getColor(
                                        Math.floor(maxCharacters / 2),
                                        maxCharacters
                                    ),
                                    width: "40px",
                                    height: "40px",
                                    margin: "0",
                                }}
                            ></p>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p style={{textAlign: "center"}}>{maxCharacters}</p>
                            <p
                                style={{
                                    backgroundColor: getColor(
                                        maxCharacters,
                                        maxCharacters
                                    ),
                                    width: "40px",
                                    height: "40px",
                                    margin: "0",
                                }}
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeatMapGraph;
