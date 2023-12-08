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

export type { Report, DetailData };
