import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { MdArrowBackIosNew, MdChevronLeft, MdChevronRight, MdNavigateNext } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import { DetailData } from '../../../types/report';
import { DAYS_IN_WEEK, DAYS_IN_WEEK_LABEL } from '../../../utils/constants';
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

const pageSize = 10;

// Function to get a specific page of data
const getPage = (pageNumber: number, data: DetailData[]) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export default function Report() {
  const reports = useAppSelector((s) => s.data.timerReports);
  const timers = useAppSelector((s) => s.data.timers);
  const [isChart, setIsChart] = useState(true);
  const formattedData = ReportHandler();
  const [page, setPage] = useState(1);
  const isLastPage = Math.ceil(formattedData.length / pageSize) <= page;

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

  // const Element = () => (
  //   <table>
  //     <div className='flex text-primary-dark text-base gap-3 justify-between px-4 w-80'>
  //       <p>DATE</p>
  //       <p>TITLE</p>
  //       <p>MINUTES</p>
  //     </div>
  //     {formattedData.map((val) => (
  //       <div
  //         key={val.id.toString() + val.date}
  //         className='flex text-primary-dark text-base gap-3 justify-between p-1 w-80'
  //       >
  //         <p data-test='report-detail-label'>{`${val.title} (${val.date})`}</p>
  //         <p className=' text-end px-5' data-test='report-detail-value'>
  //           {Math.round(val.report / 60)}
  //         </p>
  //       </div>
  //     ))}
  //   </table>
  // );

  // const Element = () => (
  //   <table className='table-auto'>
  //     <thead>
  //       <tr>
  //         <th>DATE</th>
  //         <th>TITLE</th>
  //         <th>MINUTES</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  // {formattedData.map((val) => (
  //   <tr key={val.id.toString() + val.date}>
  //     <td data-test='report-detail-date'>${val.date}</td>
  //     <td data-test='report-detail-label'>{`${val.title} (${val.date})`}</td>
  //     <td className=' text-end px-5' data-test='report-detail-value'>
  //       {Math.round(val.report / 60)}
  //     </td>
  //   </tr>
  // ))}
  //     </tbody>
  //   </table>
  // );
  const Element = () => (
    <div className='flex flex-col rounded'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light rounded'>
              <thead className='border-b font-medium dark:border-neutral-500 rounded'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Title / Project
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    MINUTES
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPage(page, formattedData).map((val) => (
                  <tr
                    className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'
                    key={val.id.toString() + val.date}
                  >
                    <td className='whitespace-nowrap px-6 py-4' data-test='report-detail-date'>
                      {val.date}
                    </td>
                    <td
                      className='whitespace-nowrap px-6 py-4'
                      data-test='report-detail-label'
                    >{`${val.title} (${val.date})`}</td>
                    <td className='whitespace-nowrap px-6 py-4' data-test='report-detail-value'>
                      {Math.round(val.report / 60)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='w-full flex justify-center gap-2'>
              {/* Paging */}
              <button
                className={`p-1.5 text-2xl bg-slate-50 rounded-md mt-2 ${
                  page === 1 ? `text-slate-100` : 'hover:bg-slate-200'
                }`}
                onClick={() => {
                  if (page === 1) return;
                  setPage((val) => val - 1);
                }}
              >
                <MdChevronLeft />
              </button>
              <button
                className={`p-1.5 text-2xl bg-slate-50 rounded-md mt-2 ${
                  isLastPage ? `text-slate-100` : 'hover:bg-slate-200'
                }`}
                onClick={() => {
                  if (isLastPage) return;
                  setPage((val) => val + 1);
                }}
              >
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-white px-5 py-3 rounded'>
      {/* <h2 className='text-2xl font-semibold text-center'>Report</h2> */}
      <div className='flex flex-col text-gray-500 font-medium my-2'>
        <div className='flex mx-auto mb-5 gap-10'>
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
