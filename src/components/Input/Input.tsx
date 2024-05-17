import { ChangeEventHandler } from "react";

type Props = {
    inputType: string;
    name: string;
    children: string;
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
};

const Input = ({inputType, name, children, value, onChange, placeholder}: Props): JSX.Element => {
    return (
        <label>{children}
            <input maxLength={22} type={inputType} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        </label>
    )
}

export default Input;