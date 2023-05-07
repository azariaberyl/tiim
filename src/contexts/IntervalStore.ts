import { create } from 'zustand';
import { DEFAULT_INTERVAL } from '../utils/constants';

const useIntervalStore = create<props>()((set, get) => ({
  interval: DEFAULT_INTERVAL,
  updateInterval(val?) {
    if (val === undefined) {
      set((state) => ({ interval: state.interval - 1 }));
      return;
    }
    set(() => ({ interval: val }));
  },
}));

interface props {
  interval: number;
  updateInterval: (val?: number) => void;
}

export default useIntervalStore;
