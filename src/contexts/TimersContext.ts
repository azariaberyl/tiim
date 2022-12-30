import { createContext } from 'react';
import { Timer } from '../types';

const TimersContext = createContext<Timer[]>([]);

const TimersProvider = TimersContext.Provider;
const TimersConsumer = TimersContext.Consumer;

export { TimersProvider, TimersConsumer };
export default TimersContext;
