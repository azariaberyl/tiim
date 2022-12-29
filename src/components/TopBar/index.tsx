import RealtimeClock from './RealtimeClock';

function TopBar() {
  return (
    <div className='flex CONTAINER align-middle bg-white p-2'>
      <p className='flex-1'>Logo</p>
      <div className='flex items-center'>
        <RealtimeClock />
      </div>
    </div>
  );
}

export default TopBar;
