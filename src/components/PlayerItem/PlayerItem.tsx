import Button from "../Button";
import ImageContainer from "../ImageContainer";
import useReady from "../../hooks/useReady";

type Props = {
    name: string;
    onClick: (name: string) => void;
    url: string
}

const PlayerItem = ({name, onClick, url}: Props) => {
    const {readyState} = useReady();

    return(
        <li>
            <ImageContainer url={url} alt={name} state = {readyState}/>
            <Button buttonType="button" children="See score" onClick={()=> onClick(name)} />
        </li> 
    )
}

export default PlayerItem;