import { getAuth, signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { provider } from '../../utils/firebase';
import { useCallback, useEffect, useState } from 'react';
import useUserStore from '../../contexts/UserStore';

function TopBar() {
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  const onLogin = useCallback(() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        updateUser(result.user);
      })
      .catch((error) => {});
  }, []);

  const onLogout = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        updateUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }, []);

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
    <div className='z-10 md:w-[650px] w-full flex align-middle justify-between rounded-b-lg bg-[#CCFFDE]/10 pt-2 pb-3 px-6'>
      <h1 className='text-2xl font-bold text-white'>Pomodoro Timer</h1>
      {!user ? (
        <button
          onClick={onLogin}
          className='bg-default-light/40 font-bold rounded py-1 px-2 uppercase text-sm text-white hover:bg-default-light/50'
        >
          Login
        </button>
      ) : (
        <button
          onClick={onLogout}
          className='bg-default-light/40 font-bold rounded py-1 px-2 uppercase text-sm text-white hover:bg-default-light/50'
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default TopBar;
