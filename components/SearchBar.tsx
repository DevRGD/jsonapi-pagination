'use client';

import { useUserStore } from '@/libs/store';

export default function SearchBar() {
  const { filter, setFilter } = useUserStore();
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full mb-4 p-2 border rounded"
    />
  );
}
