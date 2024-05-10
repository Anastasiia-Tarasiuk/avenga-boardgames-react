import { MouseEventHandler } from "react";

type Props = {
    buttonType: "submit" | "button";
    children: string | React.ReactElement;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    id?: string;
    disabled?: boolean;
};

const Button = ({buttonType, id, children, disabled, onClick}: Props): JSX.Element => {
    return (
        <button data-id={id} onClick={onClick} type={buttonType} disabled={disabled}>{children}</button>  
    )
}

export default Button;