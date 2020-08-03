import React from 'react';

import './bell.css';
import './alerts.css';

import {useRef, useState, useReducer, useEffect} from 'react';

function reducer(state, action) { return [...state, action.payload] }

export default function Alerts() {

  const [alertReminders, setAlertReminders] = useState([]);
  const [orders, dispatch] = useReducer(reducer, []);

  const inputRef = useRef()

  const addAlert = () => {
  const input = inputRef.current;
  const alertPrice = input.value;
      
  const patt = new RegExp(/^\d+$/);
  const check = patt.test(input.value);
       
  if (input.value === '' || check === false){ alert('Number please')}
  if (input.value !== '' && check === true){ setAlertReminders([...alertReminders, alertPrice]);}
      input.value = ''
  }

  const removeAlert = (i) => {
  const newAlerts = alertReminders.filter((_, alertIndex) => alertIndex !== i)
  setAlertReminders(newAlerts);
  };

    useEffect(() => {
    const ws = new WebSocket("wss://api.bitfinex.com/ws");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "trades",
          pair: "tBTCUSD"
        })
      )
    };

    ws.onmessage = (msg) => {
      const response = JSON.parse(msg.data)
      const isAnOrder = response[1] === "tu"

      if (isAnOrder) {
        const price = response[5].toFixed(0)
        const amount = response[6].toFixed(5)
        const id = response[2]

        const d = new Date();
        const time = d.toLocaleTimeString();

        const order = {id, time, price, amount }
          
        dispatch({ type: "ADD_ORDER", payload: order })
  
      }
    };
  }, [])
 
  let alerting = ''
  
 const stopBell = () => { bell.current.className = 'fa fa-bell-o'}

  const bell = useRef();
  
    orders.forEach(p => {

    alertReminders.forEach(j => {

    let check = parseInt(j) - parseInt(p.price) 

    if (Math.abs(check) <  100) {
    bell.current.className = 'fa fa-bell-o shake'
    alerting =  'The Price Is ' + p.price ; 
    setTimeout(stopBell, 3000)
    }
    }) 
    })

    const ordersArray = []    
    orders.forEach((order) => {
      
    ordersArray.length = 9
    ordersArray.unshift(
    <tr key={order.id}><td> {order.time} </td><td>{order.price}</td><td>{order.amount}</td></tr>)}) 
  
  return (
    
    <div className="three-boxes">
         
      {/* box 1  */}
      <div className="box orderbook">

      <h4> BTC Order Book</h4>
        <table>
          <thead><tr><th>Time </th><th>Price</th><th>Amount</th></tr></thead>
          <tbody>{ordersArray}</tbody>
        </table>

      </div>
       {/* box 1  END*/}

      {/* box 2  */}
      <div className="box alert">

      <div className="header">
      <h4>Add Alert</h4>
      <input ref={inputRef} placeholder="Add Alert Price"  maxLength="10" />
      <button onClick={addAlert}>Add</button>
      </div>

      <ul>
      {alertReminders.map((alert, i) => (
      <li key={i}>
      <i className="fa fa-dollar"> </i>
      { alert }  
      <i className="fa fa-remove" onClick={() => removeAlert(i)}> </i>
      </li>
      ))}
      </ul>
      </div>
      {/* box 2  END*/}

      {/* box 3  */}
      <div className="box bell">
      <h4> Bell</h4> 
      <h4>{alerting}</h4>
      <i ref={bell}></i>
      </div>
      {/* box 3 -END-  */}

    </div>
  )
}
