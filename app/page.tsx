'use client';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/libs/api';
import { useUserStore } from '@/libs/store';
import SearchBar from '@/components/SearchBar';
import UserTable from '@/components/UserTable';

export default function Page() {
  const { setUsers } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, [setUsers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white text-lg">
        Loading user data...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400 drop-shadow-md">User Directory</h1>
        <div className="mb-6">
          <SearchBar />
        </div>
        <UserTable />
      </div>
    </main>
  );
}
