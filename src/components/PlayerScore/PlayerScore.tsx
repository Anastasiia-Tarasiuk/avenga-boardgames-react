import { ChangeEvent } from "react";
import PlayerScoreItem from "../PlayerScoreItem";

type Player = {
    name: string;
    hidden: boolean;
};

type Props = {
    currentPlayer: any;
    players: Player[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    score: string;
    onClick: any;
}

const PlayerScore = ({players, currentPlayer, onChange, onClick, score}: Props) => {
    localStorage.setItem("players", JSON.stringify(players));
    
    return (
        <ul>
            {players.filter((p: any) => !p.hidden).map((player: any) => (
                player.name === currentPlayer
                ? <PlayerScoreItem onClick={onClick} key={player.name} score={score} onChange={onChange} children={player.name} />
                : <PlayerScoreItem onClick={onClick} key={player.name} score={player.score} onChange={onChange} children={player.name} />


            ))}
        </ul>
    )
}

export default PlayerScore;