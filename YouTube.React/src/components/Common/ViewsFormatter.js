import React from 'react';

const ViewsFormatter = ({ views }) => {
  const getViewsFormat = (num) => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return `${num}`;
  };

  return <span>{getViewsFormat(views)}</span>;
};

export default ViewsFormatter;