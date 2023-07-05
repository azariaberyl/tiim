type Reports = Report[];

interface Report {
  date: string;
  report: number;
  title: string;
  id_timer: string;
  id: string;
}

export type { Report, Reports };
