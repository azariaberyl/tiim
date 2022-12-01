import {AddRounded, ArrowDropDown} from '@mui/icons-material';
import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ClockCard from '../components/ClockCard';
import HorizontalReport from '../components/Report/HorizontalReport';

const Homepage = () => {
  console.log('Render homepage');
  return (
    <div className='flex CONTAINER flex-col bg-inherit gap-5'>
      <div className='mt-7 bg-white rounded-lg'>
        <div className='flex justify-between px-3 py-2 rounded-lg mb-1'>
          <button className='text-secondary-dark font-bold text-lg flex items-center '>
            <p>Category</p>
            <ArrowDropDown />
          </button>
          <Button type='secondary'>
            <p className='text-white'>Add</p>
            <AddRounded fontSize='small' sx={{color: '#B2B2B2'}} className='bg-primary-light rounded' />
          </Button>
        </div>

        <div className='flex w-full gap-5'>
          <ClockCard category='Project' time='25:00' title='Assignment' className='w-1/3' />
          <ClockCard category='Project' time='25:00' title='Assignment' className='w-1/3' />
          <ClockCard category='Project' time='25:00' title='Assignment' className='w-1/3' />
        </div>
      </div>

      <div>
        <div className='my-3 flex justify-between'>
          <p className='text-[26px] font-medium'>Report</p>
          <button className='text-2xl border-b-2 border-primary-dark'>Daily</button>
        </div>
        <p className='px-3 font-medium my-2'>Title</p>
        <Card className='bg-primary-light mt-3 rounded'>
          <div className='pl-7 py-2 text-2xl flex flex-col gap-3'>
            <HorizontalReport name='Focus' time='2.4 Hours' />
            <HorizontalReport name='Assignment' time='2 Hours' />
          </div>
        </Card>

        <p className='px-3 font-medium my-2'>Title</p>
        <Card className='bg-primary-light mt-3 rounded'>
          <div className='pl-7 py-2 text-2xl flex flex-col gap-3'>
            <HorizontalReport name='Focus' time='2.4 Hours' />
            <HorizontalReport name='Assignment' time='2 Hours' />
          </div>
        </Card>

        <div className='h-[2px] bg-primary-dark w-full my-10' />

        <div className='flex w-full'>
          <div>
            <p className='text-3xl font-bold'>Tiimz</p>
            <p className='text-xl'>Track everything and see how consistent you've been doing it</p>
          </div>

          <div className='text-xl flex justify-center gap-12 items-center px-12 py-7 h-36 rounded bg-white w-full'>
            <p>Logo</p>
            <p>
              Login to get better <br /> experiences
            </p>
            <Button>Login</Button>
            <button>Or Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
