import React from 'react';

interface HorizontalReport extends React.HTMLProps<HTMLDivElement> {
  name: string;
  time: any;
}

function HorizontalReport(props: HorizontalReport) {
  const {name, time, className, ...HtmlProps} = props;
  return (
    <div className='flex items-center' {...HtmlProps}>
      <p className='w-1/6'>{name}</p>
      <div className='h-1 rounded-lg bg-primary-dark w-4/6' />
      <p className='ml-auto'>{time}</p>
    </div>
  );
}

export default HorizontalReport;
