import { MouseEventHandler } from "react";

type Props = {
    buttonType: "submit" | "button";
    children: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};

const Button = ({buttonType, children, disabled, onClick}: Props) => {
    return (
        <button onClick={onClick} type={buttonType} disabled={disabled}>{children}</button>
    )
}

export default Button;