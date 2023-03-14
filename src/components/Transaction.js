import './Transaction.css'
import Item from './Item'

const Transaction = (props) => {
    const { items } = props
    return (
        <div>
            <ul className="item-list">
                {
                    items.map(e => {
                        return <Item  {...e} key={e.id} />
                    })
                }
            </ul>
        </div>
    )
}

export default Transaction