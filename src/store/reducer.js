import { combineReducers } from "redux";
import { ADDGAME, ADDPLAYER, ADDFAVOURITE, RESETPLAYERS, UPDATESCORE, SETCURRENTGAME, SETDATE, UPDATEGAMES, UPDATEFAVOURITE, SETWINNERS, SETHOTTEST, UPDATEVISIBILITY} from "./types";
import { initialState } from "./initialState";

const gameReducer = (store = initialState.games, action) => {
    switch (action.type) {
        case ADDGAME:
            return {
                ...store,
                games: [...store.games, action.payload]
            };

        case SETCURRENTGAME: 
            return {
                ...store,
                currentGame: action.payload
            };

        case SETDATE:
            return {
                ...store,
                date: action.payload
            };

        case UPDATEGAMES: 
            return {
                ...store,
                games: action.payload
            };

        default:
            return store;
    }
};


const playerReducer = (store = initialState.players, action) => {
    switch (action.type) {
        case ADDPLAYER:
            return {
                ...store,
                players: [...store.players, action.payload] 
            };

        case RESETPLAYERS:
            return {
                ...store,
                players: [...store.players].map(player => {
                    player.hidden = true;
                    player.score = 0;
                    return player;
                })
            };

        case UPDATESCORE:
            return {
                ...store,
                players: [...store.players].map(player => {
                    if (player.name.toLowerCase() === action.payload.playerName.toLowerCase()) {
                        player.score = action.payload.score
                    }
                    return player;
                })
            };

        case UPDATEVISIBILITY:
            return {
                ...store,
                players: [...store.players].map(player => {
                    if (player.name.toLowerCase() === action.payload.playerName.toLowerCase()) {
                        player.hidden = action.payload.hidden
                    }
                    return player;
                })
            };

        case SETWINNERS:
            return {
                ...store,
                winners: action.payload
            };    
    
        default:
            return store;
    }
} ;

const favouriteReducer = (store = initialState.favourites, action) => {
    switch (action.type) {
        case ADDFAVOURITE:
            return {
                ...store,
                favourites: [...store.favourites, action.payload] 
            };
        case UPDATEFAVOURITE:

            return {
                ...store,
                favourites: store.favourites.filter(game => game.id !== action.payload)
            };

        default:
            return store;
    }
};

const hottestReducer = (store = initialState.hottest, action) => {
    switch (action.type) {
        case SETHOTTEST:
            return {
                ...store,
                hottest: action.payload
            };
      
        default:
            return store;
    }
}


export const rootReducer = combineReducers({
    games: gameReducer,
    players: playerReducer, 
    favourites: favouriteReducer,
    hottest: hottestReducer,
})