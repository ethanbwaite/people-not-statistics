import React, { useEffect, useState } from 'react';
import './App.css';
import useFetch from './useFetch';
import Sound from 'react-sound';


function App() {
  const endPoint = 'https://api.thevirustracker.com/free-api?global=stats';
  const [isLoading, data, error] = useFetch(endPoint);
  const [deaths, setDeaths] = useState();
  const [sound, setSound] = useState();

  function onStartClick() {
    setDeaths(data.map((datum) => datum.total_new_deaths_today));
    alert(data.map((datum) => datum.total_new_deaths_today));
    setSound( <Sound
              url="church-bell.mp3"
              playStatus={Sound.status.PLAYING}
              autoLoad={true}
              // onLoading={this.handleSongLoading}
              // onPlaying={this.handleSongPlaying}
              onFinishedPlaying={handleSongFinishedPlaying}
            /> );
  }

  function handleSongFinishedPlaying() {
    setDeaths(deaths - 1);
    if (deaths > 0)
      setSound( <Sound
        url="church-bell.mp3"
        playStatus={Sound.status.PLAYING}
        autoLoad={true}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}
        onFinishedPlaying={handleSongFinishedPlaying}
      /> );
  }

  useEffect(() => {
    if (false)
      setDeaths(data.map((datum) => datum.total_new_deaths_today));
  }, [isLoading])

  return (
      <body>
        <div className="app">
          <div className="quote">
            <p className="john-donne"> “Any man's death diminishes me, because I am involved in mankind; and therefore never send to know for whom the bell tolls; it tolls for thee.”</p>
            <p>-John Donne 1624</p>
            <p>In this age, we have near instant access to information about the lives lost during this pandemic at our fingertips - yet the events happening seem so far away.</p>
            <p>In the middle ages, after a funeral the church would ring a bell to honor their death. Nine tolls for a man, three for a woman, and one for a child.</p>
            <p>Everyone for miles around would hear the bells and know that someone they may have known had just passed, and they would have to send someone out to the church to learn of their name. This was the main way people knew of any deaths in their area.</p>
            <p>The goal of this website is to slow down and think about the lives that are ending around us due to this crisis. When reduced to a mere number on a screen, the gravity of the statistic is lost.</p>
            <p>This site will toll a bell once for every man and woman that lost their lives in the past day to this disease.</p>
          </div>
          <button onClick={onStartClick}>Start.</button>
      </div>
      {sound}
    </body>
  );
}

export default App;
