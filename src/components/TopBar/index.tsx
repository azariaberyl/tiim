import RealtimeClock from './RealtimeClock';

function TopBar() {
  console.log('Render topbar');
  return (
    <div className='flex w-full align-middle bg-white p-2'>
      <p className='flex-1'>Logo</p>
      <div className='flex items-center'>
        <RealtimeClock />
        <button className='ml-2 py-1 px-3 font-medium hover:bg-secondary-dark hover:text-white rounded'>Login</button>
      </div>
    </div>
  );
}

export default TopBar;
