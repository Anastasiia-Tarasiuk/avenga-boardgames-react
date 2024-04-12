import Button from "../Button";
import Input from "../Input";
import { ChangeEventHandler, FormEventHandler } from "react";

type Props = {
    inputType: string;
    buttonType: 'submit';
    name: string;
    children: string;
    value: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

const Filter = ({inputType, buttonType, name, value, children, onChange, onSubmit}: Props) => {

    
    return (
        <form onSubmit={onSubmit}>
            <Input inputType={inputType} name={name} value={value} onChange={onChange} children={children}/>
            <Button buttonType={buttonType}>Search</Button>
        </form>
    )
}

export default Filter;