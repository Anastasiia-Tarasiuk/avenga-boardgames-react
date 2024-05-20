import { useParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import StatsList from "../../components/StatsList";
import { GameData, IStore } from "../../../@types/types";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import css from "./Stats.module.css";

const Stats = (): JSX.Element => {
    const {playerId} = useParams<{playerId: string}>();
    const games: GameData[] = useSelector((state: IStore)=> state.games.games);
    const ref = useRef<HTMLElement>();
    const [isPlayed, setIsPlayed] = useState<boolean>(false);

    useEffect(()=>{
        if (ref.current) {
            if (ref.current.children.length > 0) {
                setIsPlayed(true)
            }
        }
    }, [])
    
    return (
        <div className={css["section-container"]}>
            <PageHeading children={`Game stats of ${playerId}`}/>
            <StatsList className={css.list} ref={ref} games={games} playerId={playerId}/>
            {!isPlayed && <Text children="No played games yet"/>}
        </div>
    )
}

export default Stats;