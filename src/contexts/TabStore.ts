import { create } from 'zustand';
import { tab } from '../types';

interface props {
  tab: tab;
  onChangeTab: (val: tab) => void;
}

const useTabStore = create<props>()((set) => ({
  tab: 1,
  onChangeTab(val) {
    set(() => ({ tab: val }));
  },
}));

export default useTabStore;
