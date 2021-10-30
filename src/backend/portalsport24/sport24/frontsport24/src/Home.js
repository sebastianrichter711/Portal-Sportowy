import React from 'react';
import './style.css';

function Expo() {

   const d = new Date()
    const weekDay = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
    const day = weekDay[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

  return (
  	<>
    <div className="main">
          <div className="date">        
             <h1>{day}, {date} {month} {year}</h1>
          </div>
     </div>
  </>
  );
}

export default Expo;