import React from "react";
import { FaFileExport } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

export default function Incomeboard() {
  return (
    <>
      <section className="space-y-6">
        <div class="flex items-center justify-end  gap-2 font-sans text-md font-medium leading-none text-slate-800">
          <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FiFilter />
            </svg>
            <p className=" font-semibold">Filter</p>
          </button>
          <button class="inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="w-4 h-4" viewBox="0 0 16 16">
              <FaFileExport />
            </svg>
            <p class=" font-semibold">Export</p>
          </button>
        </div>
        <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-3 2xl:gap-6">
          {/* wallet */}
          <div class="w-full md:max-w-xl whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 space-y-6 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <img
                  src="wallet.png"
                  alt="Wallet"
                  className="w-12 h-12 rounded-full"
                />

                <p class="font-sans text-2xl font-semibold text-gray-800 antialiased">
                  Wallet
                </p>
              </div>
            </div>
            <ul>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Today Total Wallet Entry
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Amount Used For Contest
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Amount Unused In Wallet
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
          {/* income */}
          <div class="w-full md:max-w-xl whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 space-y-6 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <img
                  src="income.png"
                  alt="Income"
                  className="w-12 h-12 rounded-full"
                />

                <p class="font-sans text-2xl font-semibold text-gray-800 antialiased">
                  Income
                </p>
              </div>
            </div>
            <ul>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Earning From Contest
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
          {/* expense */}
          <div class="w-full md:max-w-xl whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 space-y-6 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <img
                  src="income.png"
                  alt="Income"
                  className="w-12 h-12 rounded-md"
                />

                <p class="font-sans text-2xl font-semibold text-gray-800 antialiased">
                  Exprense
                </p>
              </div>
            </div>
            <ul>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Today Price Distribution
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  GST Coin
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Amount Shared To Coching
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium text-gray-700 antialiased  ">
                  Referral Shared Coin
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
          {/* profit */}
          <div class="w-full md:max-w-xl whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 space-y-6 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <img
                  src="profit.png"
                  alt="profit"
                  className="w-12 h-12 rounded-md"
                />

                <p class="font-sans text-2xl font-semibold text-gray-800 antialiased">
                  Profit
                </p>
              </div>
            </div>
            <ul>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium uppercase text-gray-700 antialiased  ">
                  total income
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 90,000
                </p>
              </li>
              <li class="py-2 flex items-center justify-between">
                <p class="flex-1 font-sans text-left text-lg font-medium uppercase text-gray-700 antialiased  ">
                  total expense
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 30,000
                </p>
              </li>
            </ul>
            <ul>
              <li class="py-2 flex items-center justify-between border-t-2 border-dashed border-green-700">
                <p class="flex-1 font-sans text-left text-lg font-medium uppercase text-gray-700 antialiased  ">
                  total profit
                </p>
                <p class=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 60,000
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
