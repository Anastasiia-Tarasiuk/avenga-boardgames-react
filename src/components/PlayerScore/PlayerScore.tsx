import { ChangeEvent } from "react";
import PlayerScoreItem from "../PlayerScoreItem";

type Player = {
    name: string;
    hidden: boolean;
    score: string;
};

type Props = {
    currentPlayer: string | null;
    players: Player[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    score: string;
    onClick: (name: string) => void;
}

const PlayerScore = ({players, currentPlayer, onChange, onClick, score}: Props): JSX.Element => {
    localStorage.setItem("players", JSON.stringify(players));
    
    return (
        <ul>
            {players.filter((p: Player) => !p.hidden).map((player: Player) => (
                player.name === currentPlayer
                ? <PlayerScoreItem onClick={onClick} key={player.name} score={score} onChange={onChange} children={player.name} />
                : <PlayerScoreItem onClick={onClick} key={player.name} score={player.score} onChange={onChange} children={player.name} />
            ))}
        </ul>
    )
}

export default PlayerScore;