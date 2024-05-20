import PageHeading from "../../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { IStore, PlayerData } from "../../../@types/types";
import { useSelector } from "react-redux";
import css from "./Players.module.css";
import PlayerList from "../../components/PlayerList";

const Players = (): JSX.Element => {
    const navigate = useNavigate();
    const players: PlayerData[] = useSelector((state: IStore) => state.players.players);

    function onSeeScoreButtonClick(playerId: string): void {
        navigate(`/player/${playerId}`, { replace: false });
    }

    return (
        <div className={css["section-container"]}>
            <PageHeading children="Players"/>
            <PlayerList className={css.list} onClick={onSeeScoreButtonClick} list={players}/>
        </div>
    )
}

export default Players;