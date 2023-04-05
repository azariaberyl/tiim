import ClockCard from '../components/ClockCard';
import TimerContextProvider from '../contexts/TimerContext';

const Tiimz = () => {
  return (
    <TimerContextProvider>
      <ClockCard className=' w-[600px] mx-auto my-5' />
    </TimerContextProvider>
  );
};

export default Tiimz;
