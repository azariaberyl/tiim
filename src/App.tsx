import {Routes, Route, Navigate} from 'react-router-dom';
import TopBar from './components/TopBar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <footer className='h-10'></footer>
    </>
  );
}

export default App;
