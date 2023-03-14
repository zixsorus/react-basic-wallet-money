import './App.css'
import FormComponent from './components/FormComponent'
import Transaction from './components/Transaction'
import { useState, useEffect } from 'react'
import DataContext from './data/DataContext'
import ReportComponent from './components/ReportComponent'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'


const Title = () => <h1 style={{ color: 'darkgreen', textAlign: 'center' }}>แอพบัญชีรายรับ - รายจ่าย</h1>
const Description = () => <p>บันทึกข้อมูลบัญชีในแต่ละวัน</p>


function App() {
  // const initialState = [
  //   { id: 1, title: "เงินเดือน", amount: 12000 },
  //   { id: 2, title: "ค่าไฟ", amount: -1800 },
  //   { id: 3, title: "ค่าน้ำมัน", amount: -3000 },
  //   { id: 4, title: "ขายของ", amount: 5000 }
  // ]

  const [items, setItems] = useState([])
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(() => {
    const amounts = items.map(items => items.amount)
    const income = amounts.filter(e => e > 0).reduce((total, e) => total += e, 0)
    const expense = (amounts.filter(e => e < 0).reduce((total, e) => total += e, 0)) * -1

    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  }, [items, reportIncome, reportExpense]);

  
  return (
    <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }}>
      <div className='container'>
        <Title />
        
        <Description />
        <Router>
          <div>
            <ul className='horizontal-menu'>
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route path="/insert" element={
              <>
                <FormComponent onAddItem={onAddNewItem} />
                <Transaction items={items} />
              </>
              } />
            </Routes>
          </div>
        </Router>



      </div>
    </DataContext.Provider>

  );
}

export default App;
