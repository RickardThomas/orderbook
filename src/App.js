import React, {useState} from 'react';
import './App.css';
import Clock from './Components/Clock';
import Alerts from './Components/Alerts';

function App() {

const [isDark, setLight] = useState(true)

function hanClick () { setLight(isDark  ?  false : true) }

return (

<div className='App'> 

<div className={isDark ? 'dark mode' : 'light mode' }>

<div className='heading'>
<span onClick={hanClick} className={ isDark ? " icon fa fa-sun-o" : "icon fa fa-moon-o"} ></span>
<span className='my-clock'> <Clock/></span>

</div>

<Alerts/>

</div>

</div>
)
}

export default App;
