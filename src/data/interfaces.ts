export interface Category {
  Id: number;
  Position: number;
  Title: string;
  Description?: string;
}

export interface AppData {
  categories: Category[];
}
