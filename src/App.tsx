import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { Homepage, Tiimz } from './pages';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Tiimz />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
  );
}

export default App;
