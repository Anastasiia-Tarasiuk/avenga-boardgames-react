import { ChangeEventHandler } from "react";
import Input from "../Input";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    onClick: (name: string) => void;
    children: string;
    score: string;
}


const PlayerScoreItem = ({onChange, onClick, children, score}: Props): JSX.Element => {
    return (
        <li onClick={()=>onClick(children)}>
            <Input inputType="number" name="score" value={score} children={children} onChange={onChange}/>
        </li>
    )
}

export default PlayerScoreItem;