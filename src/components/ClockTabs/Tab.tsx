import React, { memo } from 'react';
import useTabStore from '../../contexts/TabStore';
import { tab } from '../../types';

interface props {
  id: tab;
  name: string;
}

function Tab({ id: key, name }: props) {
  const { onChangeTab, tab } = useTabStore();

  return (
    <button
      onClick={() => onChangeTab(key)}
      className={`px-4 py-1 font-bold text-white/90 bg-default-light/20 hover:bg-default-light/40 hover:text-white rounded ${
        tab === key && 'text-white bg-default-light/40'
      }`}
    >
      {name}
    </button>
  );
}

export default memo(Tab);
