import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import { Homepage, Report } from './pages';

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route path='report' element={<Report />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
