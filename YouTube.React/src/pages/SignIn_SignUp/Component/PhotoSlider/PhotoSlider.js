import React, { useMemo } from 'react';
import './PhotoSlider.css';

import SignPhoto1 from '../../Images/SignPhoto1.png';
import SignPhoto2 from '../../Images/SignPhoto2.png';
import SignPhoto3 from '../../Images/SignPhoto3.png';
import SignPhoto4 from '../../Images/SignPhoto4.png';
import SignPhoto5 from '../../Images/SignPhoto5.png';
import SignPhoto6 from '../../Images/SignPhoto6.png';
import SignPhoto7 from '../../Images/SignPhoto7.png';

const imageSet = [
  [SignPhoto1, SignPhoto2, SignPhoto3],
  [SignPhoto4, SignPhoto5, SignPhoto6],
  [SignPhoto7, SignPhoto1, SignPhoto3]
];

export default function PhotoSlider() {
  return (
    <>
      {imageSet.map((set, i) => (
        <div className='slider-row' key={i}>
          {[...set, ...set].map((src, idx) => (
            <img src={src} alt={`slider-${i}-${idx}`} key={idx} />
          ))}
        </div>
      ))}
    </>
  );
}
