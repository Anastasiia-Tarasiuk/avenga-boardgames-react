import { MouseEventHandler } from "react";

type Props = {
    children: any;
    onClick?: MouseEventHandler<HTMLLIElement>;
}

const ListItem = ({onClick, children}: Props) => {
    return (
        <li onClick={onClick}>{children}</li>
    )
}

export default ListItem;