import PlayerSelectOption from "../PlayerSelectOption";

const PlayerSelect = ({players, onChange}: any) => {
    const options = players.map((player: any) => {
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