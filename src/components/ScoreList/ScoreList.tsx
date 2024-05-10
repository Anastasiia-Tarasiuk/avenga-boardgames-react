import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}


const ScoreList = ({children}: Props) => {
    return <ul>{children}</ul>
}

export default ScoreList;