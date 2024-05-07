// import Text from "../Text";

type Props = {
    url: string; 
    name: string; 
}

const Image = ({url, name}: Props) => {
    return <div>
        <img src={url} alt={name}/>
        {/* <Text children={name}/> */}
    </div>
}

export default Image;