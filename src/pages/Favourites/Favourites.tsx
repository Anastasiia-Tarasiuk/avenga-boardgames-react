import PageHeading from "../../components/PageHeading";
import Text from "../../components/Text";

const Favourites = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');

    return (
        <>
        <PageHeading children="Favourites"/>
        {favourites.length > 0
            ? <div>Favourites</div>
            : <Text children="No items"/>}
        </>
    )
}

export default Favourites;