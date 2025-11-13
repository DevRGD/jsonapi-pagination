import axios from 'axios';
import { User } from '@/types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
}
