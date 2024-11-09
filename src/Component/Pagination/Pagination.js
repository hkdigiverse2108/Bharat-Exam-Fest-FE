import React, { useState } from "react";

export default function Pagination({ total,page,current}) {
  const totalPages = Math.ceil(total / page);
  const handleNextPage = () => {
    if (current < total) {
      page((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (current > 1) {
      page((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col md:flex-row items-center justify-between p-2 border-t rounded-b-xl">
        <p className="block text-sm text-slate-800">{` Page ${current} of ${total} `}</p>
        <div className="flex gap-1">
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition-all hover:text-orange-400 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition-all hover:text-orange-400 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
