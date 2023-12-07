import React, { useState } from 'react';
import { DAYS_IN_WEEK, DAYS_IN_WEEK_LABEL } from '../../../utils/constants';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Colors } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../../app/hooks';
import ReportHandler from '../Controller/ReportHandler';
import { AiFillClockCircle } from 'react-icons/ai';

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

export default function Report() {
  const reports = useAppSelector((s) => s.data.timerReports);
  const timers = useAppSelector((s) => s.data.timers);
  const [isChart, setIsChart] = useState(true);
  const formattedData = ReportHandler();

  const datasets = timers.flatMap((timer) => {
    const data = DAYS_IN_WEEK.flatMap((day) => {
      const theReports = reports.find((val) => val.id_timer === timer.id);
      if (theReports === undefined) return [];
      const theDateReport = theReports.reports.find((val) => val.date === day);
      if (theDateReport !== undefined) {
        return (theDateReport.report / 3600).toFixed(1);
      }
      return 0;
    });
    if (data.every((val) => val == 0)) return [];
    return {
      label: timer.title,
      data,
    };
  });

  const data = {
    labels: DAYS_IN_WEEK_LABEL,
    datasets,
  };

  const Element = () => (
    <>
      <div className='flex text-primary-dark text-base gap-3 justify-between px-4 w-80'>
        <p>TITLE</p>
        <p>MIN</p>
      </div>
      {formattedData.map((val) => (
        <div
          key={val.id.toString() + val.date}
          className='flex text-primary-dark text-base gap-3 justify-between p-1 w-80'
        >
          <p data-test='report-detail-label'>{`${val.title} (${val.date})`}</p>
          <p className=' text-end px-5' data-test='report-detail-value'>
            {Math.round(val.report / 60)}
          </p>
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

// export default Report;

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
      <button data-test='report-tab' disabled className='bg-slate-200 py-1 px-3 rounded'>
        {children}
      </button>
    );
  }
  return (
    <button data-test='report-tab' onClick={onClick} className='bg-slate-50 py-1 px-3 rounded hover:bg-slate-200'>
      {children}
    </button>
  );
}
