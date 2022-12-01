import {DeleteOutlineRounded, SettingsOutlined} from '@mui/icons-material';
import React from 'react';
import Button from './Button';

interface ClockCard extends React.HTMLProps<HTMLDivElement> {
  title: string;
  category: string;
  time: any;
}

function ClockCard(props: ClockCard) {
  const {title = 'Test', category = 'Test', time = '25:00', ...HtmlProps} = props;
  return (
    <div {...HtmlProps}>
      <div style={{boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)'}} className=' bg-white flex flex-col items-center p-3 rounded-xl'>
        <button className='w-full flex justify-end'>
          <SettingsOutlined className='text-primary-dark' />
        </button>
        <p className='w-fit font-medium text-4xl'>{time}</p>
        <div className='gap-1 my-1 flex justify-center flex-col items-center'>
          <p className='w-fit font-medium text-xl'>{title}</p>
          <p className='w-fit font-medium text-secondary-dark'>{category}</p>
        </div>
        <div className='flex w-full items-center justify-center gap-3'>
          <Button>Start</Button>
          <button>
            <DeleteOutlineRounded fontSize='large' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClockCard;
