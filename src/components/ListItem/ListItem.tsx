import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const ListItem = ({children}: Props): JSX.Element => {
    return (
        <li>{children}</li>
    )
}

export default ListItem;