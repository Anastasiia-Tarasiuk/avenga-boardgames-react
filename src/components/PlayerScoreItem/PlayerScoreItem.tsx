import { ChangeEventHandler } from "react";
import Input from "../Input";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    onClick: (name: string) => void;
    children: string;
    score: string | number;
}

const PlayerScoreItem = ({onChange, onClick, children, score}: Props): JSX.Element => {
    return (
        <li>
            <div onClick={()=>onClick(children)}>
                <Input inputType="number" name="score" value={score} children={children} onChange={onChange}/>
            </div>
        </li>
    )
}

export default PlayerScoreItem;