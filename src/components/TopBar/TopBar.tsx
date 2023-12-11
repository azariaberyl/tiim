import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { provider } from '../../utils/firebase';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUser } from '../../features/dataSlice';

function TopBar() {
  const user = useAppSelector((s) => s.data.user);
  const dispatch = useAppDispatch();

  const onLogin = useCallback(() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(updateUser(result.user));
      })
      .catch((error) => {});
  }, []);

  // const onLogin = useCallback(async () => {
  //   const auth = getAuth();
  //   // await signInWithRedirect(auth, provider);
  //   const result = await getRedirectResult(auth);

  //   if (result) {
  //     // This is the signed-in user
  //     const user = result.user;
  //     // This gives you a Google Access Token.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     console.log('user, credential, token', user, credential, token);
  //     dispatch(updateUser(result.user));
  //   }
  // }, []);

  const onLogout = useCallback(() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(updateUser(null));
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }, []);

  return (
    <div className='z-10 md:w-[650px] w-full flex align-middle justify-between rounded-b-lg bg-[#CCFFDE]/10 pt-2 pb-3 px-6'>
      <h1 className='text-2xl font-bold text-white'>Pomodoro Timer</h1>
      {!user ? (
        <button
          data-test='login'
          onClick={onLogin}
          className='bg-default-light/40 font-bold rounded py-1 px-2 uppercase text-sm text-white hover:bg-default-light/50'
        >
          Login
        </button>
      ) : (
        <button
          data-test='logout'
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
