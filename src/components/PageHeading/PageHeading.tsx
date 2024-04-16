type Props = {
    children: string;
}

const PageHeading = ({children}: Props) => {
    return (
            <h2>{children}</h2>
    )
}

export default PageHeading;