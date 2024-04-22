type Props = {
    children: string;
}

const PageHeading = ({children}: Props): JSX.Element => {
    return (
        <h2>{children}</h2>
    )
}

export default PageHeading;