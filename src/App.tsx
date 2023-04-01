import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { Homepage, Tiimz } from './pages';

function App() {
  console.log(process.env.NODE_ENV);

  return (
    <div className='w-full min-h-screen overflow-hidden '>
      <TopBar />
      <Routes>
        <Route path='/' element={<Tiimz />} />
        <Route path='/product' element={<Homepage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
