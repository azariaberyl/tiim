import React from 'react';

function Card(props: React.HTMLProps<HTMLDivElement>) {
  return <div className={`py-3 px-2 drop-shadow ${props.className}`}>{props.children}</div>;
}

export default Card;
