import PageHeading from "../../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { IStore, PlayerData } from "../../../@types/types";
import PlayerItem from "../../components/PlayerItem";
import { useSelector } from "react-redux";

const Players = (): JSX.Element => {
    const navigate = useNavigate();
    const players: PlayerData[] = useSelector((state: IStore) => state.players.players);

    function onSeeScoreButtonClick(playerId: string): void {
        navigate(`/player/${playerId}`, { replace: false });
    }

    const items = players.map((player: PlayerData)=> {
        const name = player.name;
        return <PlayerItem key={name} name={name} children={name} onClick={onSeeScoreButtonClick}/>
    })

    return (
        <>
            <PageHeading children="Players"/>
            <ul>{items}</ul>
        </>
    )
}

export default Players;