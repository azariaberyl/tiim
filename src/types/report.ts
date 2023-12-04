interface Report {
  id_timer: string;
  // date -> new Date().toLocaleDateString()
  reports: { date: string; report: number }[];
}

interface DetailData {
  id: string;
  title: string;
  date: string;
  report: number; // Second
}

const map = new Map([
  ['1', 1],
  ['1', 1],
  ['1', 1],
  ['1', 1],
]);

map.get('1');

export type { Report, DetailData };
