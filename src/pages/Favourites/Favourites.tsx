import { GameData, IStore } from "../../../@types/types";
import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";
import ListItem from "../../components/GameItem";
import useReady from "../../hooks/useReady";
import { useDispatch, useSelector } from "react-redux";
import { updateFavourite } from "../../store/actions";

const Favourites = () => {
    const favourites: GameData[] = useSelector((state: IStore) => state.favourites.favourites);
    const {readyState} = useReady();
    const dispatch = useDispatch();

    function removeFromFavourites(id: string) {
        dispatch(updateFavourite(id));
    }

    const items = favourites.map((item: GameData) => {
        const id = item.id;
        const name = item.name;
        return <ListItem key={id} state={readyState} url={item.image} name={name} id={id} onClick={()=>removeFromFavourites(id)} children="Remove" item={item}/>
    })

    return (
        <>
        <PageHeading children="Favourites"/>
        {favourites.length > 0
            ? <div>{items}</div>
            : <Text children="No items"/>}
        </>
    )
}

export default Favourites;