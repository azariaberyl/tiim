import React, { useState } from 'react';
import useTimerColectionStore from '../../../contexts/TimerColectionStore';
import { DAYS_IN_WEEK, DAYS_IN_WEEK_LABEL } from '../../../utils/constants';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Colors } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../../app/hooks';
import ReportHandler from '../Controller/ReportHandler';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Colors);

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  maintainAspectRatio: false,
};

function Report() {
  const reports = useAppSelector((s) => s.data.timerReports);
  const timers = useAppSelector((s) => s.data.timers);
  const [isChart, setIsChart] = useState(true);
  const formattedData = ReportHandler();

  const data = {
    labels: DAYS_IN_WEEK_LABEL,
    datasets: timers.map((timer) => ({
      label: timer.title,
      data: DAYS_IN_WEEK.map((day) => {
        const theDateReport = reports.map((r) => {
          if (r.id_timer === timer.id) return r.reports.find((val) => val.date === day);
        });
        console.log(theDateReport);
        if (theDateReport[0] !== undefined) {
          return theDateReport[0].report === -1 ? 0 : (theDateReport[0].report / 3600).toFixed(1);
        }
        return 0;
      }),
    })),
  };
  console.log(data);

  const Element = () => (
    <>
      <div className='flex text-primary-dark text-base gap-3 justify-between px-4 w-80'>
        <p>TITLE</p>
        <p>MIN</p>
      </div>
      {formattedData.map((val) => (
        <div key={val.date} className='flex text-primary-dark text-base gap-3 justify-between p-1 w-80'>
          <p>{`${val.title} (${val.date})`}</p>
          <p className=' text-end px-5'>{Math.round(val.report / 60)}</p>
        </div>
      ))}
    </>
  );

  return (
    <div className='bg-white px-5 py-3 rounded'>
      {/* <h2 className='text-2xl font-semibold text-center'>Report</h2> */}
      <div className='flex flex-col text-gray-500 font-medium my-5'>
        <div className='flex mx-auto mb-4 gap-10'>
          <Button onClick={() => setIsChart((prev) => !prev)} disabled={isChart}>
            Report
          </Button>
          <Button onClick={() => setIsChart((prev) => !prev)} disabled={!isChart}>
            Detail
          </Button>
        </div>
        {isChart ? (
          <div className='md:h-[500px] md:w-[400px] h-[400px] relative'>
            <Bar options={options} data={data} />
          </div>
        ) : (
          <Element />
        )}
      </div>
    </div>
  );
}

export default Report;

function Button({
  disabled = false,
  children,
  onClick,
}: {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  if (disabled) {
    return (
      <button disabled className='bg-slate-200 py-1 px-3 rounded'>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} className='bg-slate-50 py-1 px-3 rounded hover:bg-slate-200'>
      {children}
    </button>
  );
}
