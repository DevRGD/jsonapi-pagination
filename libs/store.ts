import { create } from 'zustand';
import { User } from '@/types/user';

interface UserState {
  users: User[];
  filter: string;
  sortKey: keyof Pick<User, 'name' | 'email'>;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;

  setUsers: (users: User[]) => void;
  setFilter: (filter: string) => void;
  setSort: (key: keyof Pick<User, 'name' | 'email'>) => void;
  setPage: (page: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  filter: '',
  sortKey: 'name',
  sortOrder: 'asc',
  currentPage: 1,
  pageSize: 5,

  setUsers: (users) => set({ users }),
  setFilter: (filter) => set({ filter, currentPage: 1 }),
  setSort: (key) => {
    const { sortKey, sortOrder } = get();
    const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    set({ sortKey: key, sortOrder: newOrder });
  },
  setPage: (page) => set({ currentPage: page }),
}));
