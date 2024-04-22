export type PlayerData = {
    name: string;
    score: string | number;
    hidden: boolean;
}

export type GameData = {
    id: string; 
    image?: string; 
    name: string;
    score?: ScoreData[];
}

export type ScoreData = {
    date: string;
    player: string;
    score: string;
};


