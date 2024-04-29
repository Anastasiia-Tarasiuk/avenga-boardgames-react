import PageHeading from "../../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { PlayerData } from "../../../@types/types";
import PlayerItem from "../../components/PlayerItem";

const Players = (): JSX.Element => {
    const navigate = useNavigate();

    function onSeeScoreButtonClick(playerId: string): void {
        navigate(`/player/${playerId}`, { replace: false });
    }

    const players: PlayerData[] = JSON.parse(localStorage.getItem("players") || '[{"name": "You", "hidden": true, "score": "0"}]');
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