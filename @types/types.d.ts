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
        hottest: any[]
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