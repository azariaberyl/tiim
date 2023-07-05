import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { Homepage, Tiimz } from './pages';

function App() {
  return (
    <div className='w-full items-center h-screen flex flex-col'>
      <TopBar />
      <Routes>
        <Route path='/' element={<Tiimz />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
