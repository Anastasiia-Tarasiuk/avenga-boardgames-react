import Button from "../Button";
import Input from "../Input";
import { ChangeEventHandler, FormEventHandler } from "react";

type Props = {
    inputType: string;
    name: string;
    children: string;
    value: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
};

const Filter = ({inputType, name, value, children, onChange, onSubmit, placeholder}: Props): JSX.Element => {

    return (
        <form onSubmit={onSubmit}>
            <Input inputType={inputType} name={name} value={value} onChange={onChange} children={children} placeholder={placeholder}/>
            <Button buttonType="submit" children="Search" />
        </form>
    )
}

export default Filter;