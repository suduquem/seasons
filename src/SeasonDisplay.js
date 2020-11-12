import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: 'sun',
  },
  winter: {
    text: 'Burr it is cold!',
    iconName: 'snowflake',
  },
};

const getSeason = (lat, month) => {
  // Desde Apr hasta Sep, sin incluir Ene, Feb, Mar, Oct, Nov y Dec
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter'; // Operador terciario
    //if lat > 0 = north -> summer, otherwise lat > 0 = south -> winter
  } else {
    // Meses: Ene, Feb, Mar, Oct, Nov y Dec
    return lat > 0 ? 'winter' : 'summer';
    // if lat < 0 = north -> winter, otherwise lat > 0 =  south -> summer
  }
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitude, new Date().getMonth());
  // const text = season === 'winter' ? 'Burr, it is chilly' : `Let's hit the beach`;
  // const icon = season === 'winter' ? 'snowflake' : 'sun';
  const { text, iconName } = seasonConfig[season];

  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left massive ${iconName} icon`} />
      <h1>{text}</h1>
      <i className={`icon-right massive ${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;
