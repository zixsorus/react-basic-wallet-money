import PropTypes from 'prop-types'; // ES6
import './item.css'

const Item= (props)=>{
    const formatNumber =(num)=>{
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    const {title,amount}=props
    const status = amount <0 ? "expense":"income"
    const symbol = amount <0 ? "-":"+"
    return (
        <li className={status}>
            {title}<span>{symbol}{formatNumber(Math.abs(amount))}</span>
        </li>
    )
}

Item.prototype={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}
export default Item