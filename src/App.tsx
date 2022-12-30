import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Homepage from './pages/Homepage';

function App() {
  console.log(crypto.randomUUID());

  return (
    <>
      <TopBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
