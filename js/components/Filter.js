import React from 'react';

const Filter = () => {
  const filters = ['all', 'news', 'story', 'news', 'comment', 'poll'];
  const subnav = filters.map((filter, i) => (
    <li key={i}><a href="#/">{filter}</a></li>
  ));

  return (
    <ul>
      {subnav}
    </ul>
  );
};

export default Filter;
