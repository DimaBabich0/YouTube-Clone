import React from 'react';
import './PhotoSlider.css';

export default function PhotoSlider({ sources })
{
  const min = -50;
  const max = 200;
  const randNum = Math.floor(Math.random() * (max - min + 1) + min);
  
  return (
    <div className='slider-row' style={{paddingLeft: randNum}}>
      {sources.map((source) => (
        <div>
          <img src={source}></img>
        </div>
      ))}
      {sources.map((source) => (
        <div>
          <img src={source}></img>
        </div>
      ))}
    </div>
  )
}