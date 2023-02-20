export type Order = 'asc' | 'desc';

export default interface Theme {
    id: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    published: boolean;
  }