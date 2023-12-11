export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface DummyDataForInfiniteScroll {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
