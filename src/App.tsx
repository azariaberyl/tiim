import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { Tiimz } from './pages';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Tiimz />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
