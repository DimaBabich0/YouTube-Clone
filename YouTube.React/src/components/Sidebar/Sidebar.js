import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import sidebarSections from './SidebarSections';
import NavbarMobile from '../NavbarMobile/NavbarMobile';

const renderItems = (sections, isExpanded, handleShowMoreClick) => {

  return sections.map((section, sectionIndex) => {
    if (section.type === 'subscriptions') {
      return (
        <div className='section' key={sectionIndex}>
          <h1 className='category-name'>Subscriptions</h1>
          <div className={`sidenav--subscriptions ${isExpanded ? 'expanded' : ''}`}>
            {section.items.map((item, itemIndex) => (
              <div className='sidenav--item' key={itemIndex}>
                <img className='avatar' src={item.img} alt={item.name} />
                <p>
                  {item.path ? (
                    <Link to={item.path}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </p>
              </div>
            ))}
          </div>
          {section.items.length > 7 && (
            <button className='btn-toggle' onClick={handleShowMoreClick}>
              {isExpanded ? 'Show less' : 'Show more'}
              <img
                src='./images/expand_more.svg'
                className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
                alt="Toggle icon"
              />
            </button>
          )}
        </div>
      );
    }

    const sectionImg = section.img;
    return (
      <div className='section' key={sectionIndex}>
        {section.type === 'categories' && <h1 className='category-name'>Categories</h1>}
        {section.items.map((item, itemIndex) => (
          <Link to={item.path} key={itemIndex} className={`sidenav--item ${section.type === 'categories' ? 'category-item' : ''}`}>
            <img className={`icon ${section.type === 'categories' ? 'category' : ''}`} src={sectionImg || item.img} alt={item.alt} />
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    );
  });
};

  export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const subscriptionSection = sidebarSections.find(section => section.type === 'subscriptions');
    if (subscriptionSection && subscriptionSection.items.length <= 7) {
      setIsExpanded(true);
    }
  }, []);

  const handleShowMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <NavbarMobile/>
      <div className='sidenav-component'>
        <div className="sidenav">
          <div className='sidenav--main'>
            {renderItems(sidebarSections, isExpanded, handleShowMoreClick)}
          </div>
        </div>
        <div className='sidenav-spacer'></div>
      </div>
    </div>
  );
}