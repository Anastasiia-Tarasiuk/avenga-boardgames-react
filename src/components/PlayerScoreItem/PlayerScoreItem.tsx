import Input from "../Input";

const PlayerScoreItem = ({onChange, onClick, children, score}: any) => {
    return (
        <li onClick={()=>onClick(children)}>
            <Input inputType="number" name="score" value={score} children={children} onChange={onChange}/>
        </li>
    )
}

export default PlayerScoreItem;