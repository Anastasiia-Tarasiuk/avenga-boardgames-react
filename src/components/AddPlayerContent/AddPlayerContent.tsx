import { ChangeEventHandler, MouseEventHandler } from "react";
import Button from "../Button";
import Input from "../Input";

type Props = {
    value: string;
    onChange:  ChangeEventHandler<HTMLInputElement>;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const AddPlayerContent = ({value, onChange, onClick}: Props): JSX.Element => {
    return (
        <>
            <Input inputType="text" name="player" value={value} children="Type name" onChange={onChange}/>
            <Button buttonType="button" children="Save player" onClick={onClick}/>
        </>
    )
}

export default AddPlayerContent;