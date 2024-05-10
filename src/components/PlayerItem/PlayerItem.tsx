import Text from "../Text";
import Button from "../Button";

type Props = {
    name: string;
    onClick: (name: string) => void;
    children: string;
}

const PlayerItem = ({name, onClick, children}: Props) => {
    return(
        <li>
            <Text children={children}/>
            <Button buttonType="button" children="See score" onClick={()=> onClick(name)} />
        </li> 
    )
}

export default PlayerItem;