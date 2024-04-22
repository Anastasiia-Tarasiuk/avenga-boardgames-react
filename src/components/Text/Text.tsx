type Props = {
    children: string;
}

const Text = ({children}: Props): JSX.Element => {
    return (
        <p>{children}</p>
    )
}


export default Text;