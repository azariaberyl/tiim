import { create } from 'zustand';
import { DEFAULT_INTERVAL } from '../utils/constants';
import { User, getAuth } from 'firebase/auth';

const useUserStore = create<props>()((set, get) => ({
  user: null,
  updateUser: (user: User | null) => {
    set((s) => ({ user: user }));
  },
}));

interface props {
  user: User | null;
  updateUser: any;
}

export default useUserStore;
