import { ChangeEvent } from "react";
import PlayerScoreItem from "../PlayerScoreItem";
import { PlayerData } from "../../../@types/types";

type Props = {
    currentPlayer: string | null;
    players: PlayerData[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    score: string;
    onClick: (name: string) => void;
}

const PlayerScore = ({players, currentPlayer, onChange, onClick, score}: Props): JSX.Element => {    
    return (
        <ul>
            {players.filter((p: PlayerData) => !p.hidden).map((player: PlayerData) => (
                player.name === currentPlayer
                ? <PlayerScoreItem onClick={onClick} key={player.name} score={score} onChange={onChange} children={player.name} />
                : <PlayerScoreItem onClick={onClick} key={player.name} score={player.score} onChange={onChange} children={player.name} />
            ))}
        </ul>
    )
}

export default PlayerScore;