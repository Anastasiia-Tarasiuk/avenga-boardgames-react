import { ChangeEvent } from "react";
import PlayerScoreItem from "../PlayerScoreItem";

type Player = {
    name: string;
    hidden: boolean;
};

type Props = {
    players: Player[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    score: string;
}



const PlayerScore = ({players, onChange, score}: Props) => {
    return (
        <ul>
            {players.filter((p: any) => !p.hidden).map((player: any) => (
                <PlayerScoreItem key={player.name} score={score} onChange={onChange} children={player.name} />
            ))}
        </ul>
    )
}

export default PlayerScore;