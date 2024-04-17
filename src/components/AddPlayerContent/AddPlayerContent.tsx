import Button from "../Button";
import Input from "../Input";

const AddPlayerContent = ({value, onChange, onClick}: any) => {
    return (
        <>
            <Input inputType="text" name="player" value={value} children="Type name" onChange={onChange}/>
            <Button buttonType="button" children="Save player" onClick={onClick}/>
        </>
    )
}

export default AddPlayerContent;