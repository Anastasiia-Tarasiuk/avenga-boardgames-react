import Input from "../Input";

const PlayerScoreItem = ({onChange, children, score}: any) => {
    return (
        <li>
            <Input inputType="number" name="score" value={score} children={children} onChange={onChange}/>
        </li>
    )
}

export default PlayerScoreItem;