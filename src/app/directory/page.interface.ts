export interface Page<T> {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;

  data: T[];

  path: string;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}
