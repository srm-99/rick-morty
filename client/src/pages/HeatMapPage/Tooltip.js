import React from "react";

// Utils
import {getWordEnd} from "./utils/getWordEnd";

// Can be optimized but it's only a example

const Tooltip = ({coordinates, visible, info, amount}) => {
    console.log({amount});
    return (
        <span
            style={{
                backgroundColor: "#fff",
                position: "fixed",
                left: coordinates.x,
                top: coordinates.y - 20,
                display: visible ? "block" : "none",
                padding: 10,
                borderRadius: 5,
                boxShadow: "6px 6px 19px 0px rgba(0,0,0,0.53)",
            }}
        >
            <h5 style={{textAlign: "center", margin: 0}}>
                {`${info.episode} - ${
                    info.season
                } | ${amount} personaje${getWordEnd(amount)}`}
            </h5>
            <p
                style={{textAlign: "center", margin: "5px 0 0 0"}}
            >{`${info.name}`}</p>
        </span>
    );
};

export default Tooltip;
