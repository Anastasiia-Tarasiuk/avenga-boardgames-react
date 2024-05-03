export const initialState = {
    games: {
        games:[], 
        currentGame: {},
        date: ""
    },
    players: {
        players: [{
            name: "You",
            hidden: true,
            score: 0
        }],
        winners: {}
    },
    favourites: {
        favourites: []
    }
}