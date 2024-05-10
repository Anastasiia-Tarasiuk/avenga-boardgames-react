import Icon from "../Icon";


const ScoreItem = ({item, best, winners }: any) => {

    function parseDate(date: string) {
        return new Date(Number(date)).toLocaleDateString('en-GB', {  
            day:   'numeric',
            month: 'short',
            year:  'numeric',
        });
    }

    return (
        <li key={item.date}>
            <p>{parseDate(item.date)} <span>{item.score}</span> {best === Number(item.score) && <Icon state="best"/>} {winners[item.date]?.player === item.player && <Icon state="medal"/> }</p>
        </li>
    )
}

export default ScoreItem;