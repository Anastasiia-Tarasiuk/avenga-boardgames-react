import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PlayerData } from "../../../@types/types";

const Players = (): JSX.Element => {
    const navigate = useNavigate();

    function onSeeScoreButtonClick(playerId: string): void {
        navigate(`/player/${playerId}`, { replace: false });
    }

    const players: PlayerData[] = JSON.parse(localStorage.getItem("players") || '[{"name": "You", "hidden": true, "score": "0"}]');
    const items = players.map((player: PlayerData)=> {
        return <li key={player.name}>
            <Text children={player.name}/>
            <Button buttonType="button" children="See score" onClick={()=> onSeeScoreButtonClick(player.name)} />
        </li>
    })

    return (
        <>
            <PageHeading children="Players"/>
            <ul>{items}</ul>
        </>
    )
}

export default Players;