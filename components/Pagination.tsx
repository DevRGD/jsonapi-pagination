'use client';

import { useUserStore } from '@/libs/store';

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages }: Props) {
  const { currentPage, setPage } = useUserStore();
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
