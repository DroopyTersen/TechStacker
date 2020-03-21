export interface Category {
  Id: number;
  Position: number;
  Title: string;
  Description?: string;
  technologies: Tech[];
}

export interface Tech {
  Id: number;
  Title: string;
  Link: string;
  Logo: string;
  Created: string;
  Modified: string;
  AuthorId: number;
  EditorId: number;
  categoryIds: number[];
  categories: Category[];
}

export interface TechListItem extends Tech {
  CategoriesId?: {
    results?: number[];
  };
}
export interface AppData {
  categories: Category[];
  technologies: Tech[];
  users: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo: string;
  department: string;
  jobTitle: string;
  office: string;
}
