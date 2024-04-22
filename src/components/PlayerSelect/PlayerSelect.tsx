import { ChangeEventHandler } from "react";
import PlayerSelectOption from "../PlayerSelectOption";

type Player = {
    name: string; 
    hidden: boolean; 
    score: string;
}

type Props = {
    players: Player[];
    onChange: ChangeEventHandler<HTMLSelectElement>
}

const PlayerSelect = ({players, onChange}: Props): JSX.Element => {
    const options = players.map((player: Player) => {
        return <PlayerSelectOption key={player.name} value={player.name} children={player.name}/>;
    })

    return (
        <label  htmlFor="player-select">Choose a player:
            <select name="players" id="player-select" onChange={onChange}>
                <PlayerSelectOption key="choose-player" value="" children="--Please choose a player--"/>
                {options}
                <PlayerSelectOption key="new-player" value="new-player" children="Add a new player"/>
            </select>
        </label>
    )
}

export default PlayerSelect;