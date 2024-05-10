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
            <p>{parseDate(item.date)} <span>{item.score}</span> {best === Number(item.score) &&  <span>Best score</span>} {winners[item.date]?.player === item.player && <span>The winner</span> }</p>
        </li>
    )
}

export default ScoreItem;