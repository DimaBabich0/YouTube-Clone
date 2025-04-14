import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarMobile.css';

const items = [
  {
    name: 'Home',
    img: './images/icons/home.svg',
    path: '/'
  },
  {
    name: 'Playme',
    img: './images/icons/playme.svg',
    path: '/playme'
  },
  {
    name: 'Subscriptions',
    img: './images/icons/sub.svg',
    path: '/subscriptions'
  },
  {
    name: 'Streams',
    img: './images/icons/streams.svg',
    path: '/streams'
  }
];

function renderItems() {
  return items.map((item, index) => (
    <div key={index} className='navbar-mobile--item'>
        <Link to={item.path}>
        <div className='wrapper'>
            <img src={item.img} alt={item.name}></img>
            <p>{item.name}</p>
        </div>
        </Link>
    </div>
  ));
}

export default function NavbarMobile() {
  return (
    <div className="navbar-mobile">
      <div className='navbar-mobile--wrapper'>
        {renderItems()}
      </div>
    </div>
  );
}
