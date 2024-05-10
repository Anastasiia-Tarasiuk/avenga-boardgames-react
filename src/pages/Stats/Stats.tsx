import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import StatsList from "../../components/StatsList";
import { GameData, IStore } from "../../../@types/types";
import { useSelector } from "react-redux";

const Stats = (): JSX.Element => {
    const {playerId} = useParams<{playerId: string}>();
    const games: GameData[] = useSelector((state: IStore)=> state.games.games);
    
    return (
        <>
        <PageHeading children={`Game stats of ${playerId}`}/>
        {games.length > 0 
            ? <StatsList games={games} playerId={playerId} />
            : <Text children="No played games yet"/>}
        </>
    )
}

export default Stats;