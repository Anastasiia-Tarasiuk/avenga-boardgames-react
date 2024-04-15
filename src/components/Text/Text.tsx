type Props = {
    children: string;
}

const Text = ({children}: Props) => {
    return (
        <p>{children}</p>
    )
}


export default Text;