'use client';
import React, { useMemo } from 'react';
import { useUserStore } from '@/libs/store';

export default function UserTable() {
  const { users, filter, sortKey, sortOrder, currentPage, pageSize, setSort, setPage } = useUserStore();

  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [users, filter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey]?.toString().toLowerCase();
      const bVal = b[sortKey]?.toString().toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border border-gray-700 shadow-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-700/50 text-gray-200 uppercase tracking-wide text-xs">
            <tr>
              <th className="p-3 cursor-pointer hover:text-blue-400" onClick={() => setSort('name')}>
                Name {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="p-3 cursor-pointer hover:text-blue-400" onClick={() => setSort('email')}>
                Email {sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="p-3">Company</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-700/40 transition">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination + Page Size Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <label htmlFor="pageSize" className="text-gray-400">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => useUserStore.setState({ pageSize: Number(e.target.value), currentPage: 1 })}
            className="bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Previous
          </button>

          <span className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
