import React from "react";

export default function Pagination() {
  return (
    <>
      <div className="bg-white flex flex-col md:flex-row items-center justify-between p-2 border-t rounded-b-xl">
        <p className="block text-sm text-slate-800">Page 1 of 10</p>
        <div className="flex gap-1">
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition-all hover:text-orange-400 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Previous
          </button>
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-700 transition-all hover:text-orange-400 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
