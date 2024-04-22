type Props = {
    value: string;
    children: string;
}

const PlayerSelectOption = ({value, children}: Props): JSX.Element => {
    return (
        <option value={value}>{children}</option>
    )
}

export default PlayerSelectOption;