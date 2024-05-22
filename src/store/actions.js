import { SETDATE, SETCURRENTGAME, ADDGAME, RESETPLAYERS, UPDATESCORE, UPDATEVISIBILITY, SETWINNERS, UPDATEGAMES, ADDFAVOURITE, UPDATEFAVOURITE, ADDPLAYER, SETHOTTEST } from "./types";

export const setDate = (date) => {
    return {type: SETDATE, payload: date}
};

export const setCurrentGame = (game) => {
    return {type: SETCURRENTGAME, payload: game}
};

export const addGame = (game) => {
    return {type: ADDGAME, payload: game}
};

export const updateGames = (games) => {
    return {type: UPDATEGAMES, payload: games}
}

export const setWinners = (winners) => {
    return {type: SETWINNERS, payload: winners}
}

export const addFavourite = (game) => {
    return {type: ADDFAVOURITE, payload: game}
}

export const updateFavourite = (id) => {
    return {type: UPDATEFAVOURITE, payload: id}
}

export const addPlayer = (player) => {
    return {type: ADDPLAYER, payload: player}
}

export const setHottest = (items) => {
    return {type: SETHOTTEST, payload: items}
}

export const resetPlayers = () => {
    return {type: RESETPLAYERS}
}

export const updateScore = ({playerName, score}) => {
    return {type: UPDATESCORE, payload: {playerName, score}}
}

export const updateVisibility = ({playerName, hidden}) => {
    return {type: UPDATEVISIBILITY, payload: {playerName, hidden}}
}