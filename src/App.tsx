import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tiimz } from './pages';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useUserStore from './contexts/UserStore';

// TODO: Create initialize data when the app started

function App() {
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        updateUser(user);
      } else {
        // User is signed out
        // ...
        updateUser(null);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Tiimz />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
