export interface Category {
  Id: number;
  Position: number;
  Title: string;
  Description?: string;
  technologies: Tech[];
  Icon: string;
  slug: string;
}

export interface Tech {
  Id: number;
  Title: string;
  Link: string;
  Logo: string;
  Created: string;
  Description: string;
  Modified: string;
  AuthorId: number;
  EditorId: number;
  CategoryId: number;
  tags: Tag[];
  category: Category;
  slug: string;
  createdBy: User;
  modifiedBy: User;
}

export interface AppData {
  categories: Category[];
  technologies: Tech[];
  users: User[];
}

export interface Tag {
  title: string;
  technologies: Tech[];
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
