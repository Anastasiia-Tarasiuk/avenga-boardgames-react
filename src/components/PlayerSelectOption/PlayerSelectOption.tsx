type Props = {
    value: string;
    children: string;
    isShown?: boolean
}

const PlayerSelectOption = ({value, children, isShown}: Props): JSX.Element => {
    return (
        <>
            {isShown 
            ? <option value={value} disabled>{children}</option>
            : <option value={value}>{children}</option>} 
        </>
    )
}

export default PlayerSelectOption;