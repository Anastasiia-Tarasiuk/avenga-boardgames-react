import { useNavigate } from "react-router-dom";
import Text from "../../components/Text";
import SearchedList from "../../components/SearchedList";
import PageHeading from "../../components/PageHeading";

const MyList = () => {
    const gameList = JSON.parse(localStorage.getItem("gameList") || '[]');
    const navigate = useNavigate();
    console.log(gameList)
    
    function onAddScoreButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = e.currentTarget.dataset.id;
        const data = gameList.filter((game: any) => game.id === id);
        localStorage.setItem("gameData", JSON.stringify(data[0]));
        localStorage.setItem("date", JSON.stringify(Date.now()));
        navigate(`/score/${id}`, { replace: false });
    }

    return (
        <>
            <PageHeading children="My list"/>
            {gameList.length > 0
                ? <SearchedList list={gameList} onClick={(e)=>onAddScoreButtonClick(e)} children="Add score"/>
                : <Text children="No items"/>}
        </>
    )
}

export default MyList;