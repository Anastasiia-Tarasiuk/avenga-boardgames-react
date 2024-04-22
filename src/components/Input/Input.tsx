import { ChangeEventHandler } from "react";

type Props = {
    inputType: string;
    name: string;
    children: string;
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({inputType, name, children, value, onChange}: Props): JSX.Element => {
    return (
        <label>{children}
            <input type={inputType} name={name} value={value} onChange={onChange} />
        </label>
    )
}

export default Input;