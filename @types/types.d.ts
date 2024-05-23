export type PlayerData = {
    name: string;
    score: string | number;
    hidden: boolean;
}

export type GameData = {
    id: string; 
    image: string; 
    name: string;
    description: string;
    playTime: string;
    score?: ScoreData[];
    isFavourite?: boolean;
}

export type ScoreData = {
    game?: GameData;
    date: string;
    player: string;
    score: number | string;
};

export type Winner = {
    [key: string]: ScoreData;
}


export interface IStore {
    games: {
        games: GameData[],
        currentGame: GameData,
        date: string
    },
    players: {
        players: PlayerData[],
        winners: Winner
    },
    favourites: {
        favourites: GameData[]
    },
    hottest: {
        hottest: HottestData[]
    }
}

export type ScoreObj = {
    [key: string]: ScoreData[];
}

export type ImageData = {
    src: string; 
    alt: string; 
    className?: string;
}

export type Stats = {
    game: GameData;
    best: number;
    date: string;
    totalPlays: number;
    timesWon: number;
    name?: string
}

type HottestData = {
    _attributes: {
        id: string,
        rank: string
    };
    thumbnail: GerenalData;
    name: GerenalData;
    yearpublished: GerenalData;
}

type GerenalData = {
    _attributes: {
        value: string
    };
}