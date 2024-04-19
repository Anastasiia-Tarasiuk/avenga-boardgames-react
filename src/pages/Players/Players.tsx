import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Players = () => {
    const navigate = useNavigate();

    function onSeeScoreButtonClick(playerId: string) {
        navigate(`/player/${playerId}`, { replace: false });
    }

    const players = JSON.parse(localStorage.getItem("players") || '[]');
    const items = players.map((player: any)=> {
        return <li key={player.name}><Text children={player.name}/><Button buttonType="button" children="See score" onClick={()=> onSeeScoreButtonClick(player.name)} /></li>
    })

    return (
        <>
            <PageHeading children="Players"/>
            {items.length > 0 
                ? <ul>{items}</ul>
                : <Text children="You"/>}
        </>
    )
}

export default Players;