// import React from "react";
// import { FilterState } from "../types";
// import { Calendar, Clock, Search, ChevronDown, FilterIcon } from "lucide-react";
// import { Disclosure } from "@headlessui/react";

// interface FiltersProps {
//   filters: FilterState;
//   onFilterChange: (key: keyof FilterState, value: string) => void;
//   onResetFilters: () => void;
// }

// const Filters: React.FC<FiltersProps> = ({
//   filters,
//   onFilterChange,
//   onResetFilters,
// }) => {
//   return (
//     <Disclosure defaultOpen>
//       {({ open }) => (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-orange-600 bg-gray-50 hover:bg-gray-100 rounded-t-lg">
//             <span className="flex items-center gap-2">
//               <FilterIcon className="w-5 h-5 text-orange-600" />
//               Filters
//             </span>
//             <ChevronDown
//               className={`w-5 h-5 transform transition-transform duration-200 ${
//                 open ? "rotate-180" : ""
//               }`}
//             />
//           </Disclosure.Button>

//           <Disclosure.Panel className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//               <div className="col-span-2">
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                   <Search className="w-4 h-4 mr-1" />
//                   Search by URL
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter URL"
//                   value={filters.searchUrl}
//                   onChange={(e) => onFilterChange("searchUrl", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Audit Score Range
//                 </label>
//                 <select
//                   value={filters.minScore}
//                   onChange={(e) => onFilterChange("minScore", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="All">All</option>
//                   <option value="0-20">0–20</option>
//                   <option value="21-40">21–40</option>
//                   <option value="41-60">41–60</option>
//                   <option value="61-80">61–80</option>
//                   <option value="81-100">81–100</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Standard
//                 </label>
//                 <select
//                   value={filters.standard}
//                   onChange={(e) => onFilterChange("standard", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="All">All</option>
//                   <option value="WCAG2A">WCAG2A</option>
//                   <option value="WCAG2AA">WCAG2AA</option>
//                   <option value="WCAG2AAA">WCAG2AAA</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Errors Range
//                 </label>
//                 <select
//                   value={filters.errorRange}
//                   onChange={(e) => onFilterChange("errorRange", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="All">All</option>
//                   <option value="0-50">0-50</option>
//                   <option value="50-100">50-100</option>
//                   <option value="100-150">100-150</option>
//                   <option value="150+">150+</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Warnings Range
//                 </label>
//                 <select
//                   value={filters.warningRange}
//                   onChange={(e) =>
//                     onFilterChange("warningRange", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="All">All</option>
//                   <option value="0-50">0-50</option>
//                   <option value="50-100">50-100</option>
//                   <option value="100-150">100-150</option>
//                   <option value="150+">150+</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-1">
//                   Notices Range
//                 </label>
//                 <select
//                   value={filters.noticeRange}
//                   onChange={(e) =>
//                     onFilterChange("noticeRange", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="All">All</option>
//                   <option value="0-50">0-50</option>
//                   <option value="50-100">50-100</option>
//                   <option value="100-150">100-150</option>
//                   <option value="150+">150+</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                   <Calendar className="w-4 h-4 mr-1" />
//                   Date From
//                 </label>
//                 <input
//                   type="date"
//                   value={filters.dateFrom}
//                   onChange={(e) => onFilterChange("dateFrom", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                   <Calendar className="w-4 h-4 mr-1" />
//                   Date To
//                 </label>
//                 <input
//                   type="date"
//                   value={filters.dateTo}
//                   onChange={(e) => onFilterChange("dateTo", e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="col-span-2 flex items-end">
//                 <button
//                   onClick={onResetFilters}
//                   className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             </div>
//           </Disclosure.Panel>
//         </div>
//       )}
//     </Disclosure>
//   );
// };

// export default Filters;


import React from "react";
import { FilterState } from "../types";
import { Calendar, Search, ChevronDown, FilterIcon } from "lucide-react";
import { Disclosure } from "@headlessui/react";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-orange-600 bg-gray-50 hover:bg-gray-100 rounded-t-lg">
            <span className="flex items-center gap-2">
              <FilterIcon className="w-5 h-5 text-orange-600" />
              Filters
            </span>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
              {/* Search URL */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Search className="w-4 h-4 mr-1" />
                  Search by URL
                </label>
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={filters.searchUrl}
                  onChange={(e) => onFilterChange("searchUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Audit Score */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Audit Score Range
                </label>
                <select
                  value={filters.minScore}
                  onChange={(e) => onFilterChange("minScore", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All</option>
                  <option value="0-20">0–20</option>
                  <option value="21-40">21–40</option>
                  <option value="41-60">41–60</option>
                  <option value="61-80">61–80</option>
                  <option value="81-100">81–100</option>
                </select>
              </div>

              {/* Standard */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Standard
                </label>
                <select
                  value={filters.standard}
                  onChange={(e) => onFilterChange("standard", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All</option>
                  <option value="WCAG2A">WCAG2A</option>
                  <option value="WCAG2AA">WCAG2AA</option>
                  <option value="WCAG2AAA">WCAG2AAA</option>
                </select>
              </div>

              {/* Errors */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Errors Range
                </label>
                <select
                  value={filters.errorRange}
                  onChange={(e) => onFilterChange("errorRange", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All</option>
                  <option value="0-50">0–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-150">100–150</option>
                  <option value="150+">150+</option>
                </select>
              </div>

              {/* Warnings */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Warnings Range
                </label>
                <select
                  value={filters.warningRange}
                  onChange={(e) => onFilterChange("warningRange", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All</option>
                  <option value="0-50">0–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-150">100–150</option>
                  <option value="150+">150+</option>
                </select>
              </div>

              {/* Notices */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Notices Range
                </label>
                <select
                  value={filters.noticeRange}
                  onChange={(e) => onFilterChange("noticeRange", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All</option>
                  <option value="0-50">0–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-150">100–150</option>
                  <option value="150+">150+</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => onFilterChange("dateFrom", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => onFilterChange("dateTo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Reset Button */}
              <div className="col-span-full flex justify-end mt-2">
                <button
                  onClick={onResetFilters}
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Filters;
