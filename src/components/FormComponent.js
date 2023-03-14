import { useState,useEffect } from 'react';
import './FormComponent.css'
import { v4 as uuidv4 } from 'uuid';

const FormComponent =(props)=>{

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [formValid, setFormvalid] = useState(false)
    
    const inputTitle=(event)=>{
        setTitle(event.target.value)
    }

    const inputAmount=(event)=>{
        setAmount(event.target.value)
    }

    const itemSave=(event)=>{
        event.preventDefault()
        const saveItem={
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(saveItem)
        setTitle('')
        setAmount('')
    }

    useEffect(() => {
        const checkData = title.trim().length>0 && amount !==0
        setFormvalid(checkData)
    }, [title,amount]);

    return(
        <div>
            <form onSubmit={itemSave}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุรายการ" onChange={inputTitle} value={title} ></input>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="text" placeholder="ระบุจำนวนเงิน" onChange={inputAmount} value={amount} ></input>
                </div>
                <div>
                    <button className="btn" type="submit" disabled={!formValid} >เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent