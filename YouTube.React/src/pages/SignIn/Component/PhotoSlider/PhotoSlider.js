import React, { useMemo } from 'react';
import './PhotoSlider.css';

export default function PhotoSlider({ sources }) {
  const randNum = useMemo(() => {
    const min = -50;
    const max = 200;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }, []);

  return (
    <div className='slider-row' style={{ paddingLeft: randNum }}>
      {sources.map((source, index) => (
        <div key={`first-${index}`}>
          <img src={source} alt='' />
        </div>
      ))}
      {sources.map((source, index) => (
        <div key={`second-${index}`}>
          <img src={source} alt='' />
        </div>
      ))}
    </div>
  );
}
