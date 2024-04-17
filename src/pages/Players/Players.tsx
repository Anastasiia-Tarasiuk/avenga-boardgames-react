import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";

const Players = () => {
    const players = JSON.parse(localStorage.getItem("players") || '[]');
    const items = players.map((player: any)=> {
        return <li key={player.name}><p>{player.name}</p></li>
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