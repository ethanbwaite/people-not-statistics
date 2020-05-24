import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import './css/all.css';
import useFetch from './useFetch';
import Person from './Person';


function App(props) {
  const endPoint = 'https://covidtracking.com/api/us/daily';
  const endPointTotal = 'http://covidtracking.com/api/us';
  const [isLoading, data, error] = useFetch(endPoint);
  const [isLoadingTotal, dataTotal, errorTotal] = useFetch(endPointTotal);
  const [deaths, setDeaths] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  const [people, setPeople] = useState([]);
  const [displayedPeople, setDisplayedPeople] = useState(0);

  const [alltime, setAlltime] = useState(false);

  const TICK = 10;

  function showAllTime() {
    setDisplayedPeople(0);
    setPeople([]);

  }

  function tick() {
    let displayed = displayedPeople;
    console.log("displayed: " + displayed + " - deaths: " + data[0].deathIncrease)
    if (displayed < alltime ? dataTotal[0].death : data[0].deathIncrease) {
      setDisplayedPeople(displayedPeople => displayedPeople + 1);
      setPeople(prevPeople => [...prevPeople, <Person />]);
      console.log("push")
    }
  }

  useEffect(() => {
    if (data && dataTotal) {
      let tick_interval = TICK;
      if (displayedPeople > data[0].deathIncrease-50)
        tick_interval*=5;
      if (displayedPeople > data[0].deathIncrease-10)
        tick_interval*=2;
        if (displayedPeople > data[0].deathIncrease-5)
        tick_interval*=2;
      displayedPeople < data[0].deathIncrease && setTimeout(() => tick(), tick_interval);
    }
  }, [isLoading, data, dataTotal, displayedPeople]);


  return (
    <div>
      <div className="app">
        <div className="quote">
          <p className="title">People. not Statistics.</p>
          <p className="copy">Each figure on this page represents a real person who's life ended in the past day due to COVID-19 in the United States.</p>
          <p>Don't forget the humans behind the statistics.</p>
          <a href="http://covidtracking.com" className="source">Source: http://covidtracking.com</a>
          <p className="tally">{displayedPeople}</p>
          {/* <button>Show All Time</button> */}
        </div>          
        <div className="person-container">
          {people.map((person) => <div key={person.id}>{person}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
