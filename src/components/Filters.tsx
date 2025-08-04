import React from "react";
import { FilterState } from "../types";
import { Calendar, Search, ChevronDown, FilterIcon } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { Input, Select, DatePicker, Button } from "pixel-react";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

const scoreOptions = [
  { name: "All", value: "All" },
  { name: "0–20", value: "0-20" },
  { name: "21–40", value: "21-40" },
  { name: "41–60", value: "41-60" },
  { name: "61–80", value: "61-80" },
  { name: "81–100", value: "81-100" },
];

const rangeOptions = [
  { name: "All", value: "All" },
  { name: "0–50", value: "0-50" },
  { name: "50–100", value: "50-100" },
  { name: "100–150", value: "100-150" },
  { name: "150+", value: "150+" },
];

const standardOptions = [
  { name: "All", value: "All" },
  { name: "WCAG2A", value: "WCAG2A" },
  { name: "WCAG2AA", value: "WCAG2AA" },
  { name: "WCAG2AAA", value: "WCAG2AAA" },
];

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
              {/* Search by URL */}
              <Input
                type="text"
                label="Search by URL"
                placeholder="Enter URL"
                value={filters.searchUrl}
                icon={<Search className="w-4 h-4 text-gray-400" />}
                onChange={(e) =>
                  onFilterChange("searchUrl", e.target.value)
                }
              />

              {/* Audit Score Range */}
              <Select
                label="Audit Score Range"
                optionsList={scoreOptions}
                labelAccessor="name"
                valueAccessor="value"
                selectedOption={scoreOptions.find(
                  (opt) => opt.value === filters.minScore
                )}
                onChange={(val) =>
                  onFilterChange("minScore", val?.value || "All")
                }
              />

              {/* Standard */}
              <Select
                label="Standard"
                optionsList={standardOptions}
                labelAccessor="name"
                valueAccessor="value"
                selectedOption={standardOptions.find(
                  (opt) => opt.value === filters.standard
                )}
                onChange={(val) =>
                  onFilterChange("standard", val?.value || "All")
                }
              />

              {/* Error Range */}
              <Select
                label="Errors Range"
                optionsList={rangeOptions}
                labelAccessor="name"
                valueAccessor="value"
                selectedOption={rangeOptions.find(
                  (opt) => opt.value === filters.errorRange
                )}
                onChange={(val) =>
                  onFilterChange("errorRange", val?.value || "All")
                }
              />

              {/* Warning Range */}
              <Select
                label="Warnings Range"
                optionsList={rangeOptions}
                labelAccessor="name"
                valueAccessor="value"
                selectedOption={rangeOptions.find(
                  (opt) => opt.value === filters.warningRange
                )}
                onChange={(val) =>
                  onFilterChange("warningRange", val?.value || "All")
                }
              />

              {/* Notice Range */}
              <Select
                label="Notices Range"
                optionsList={rangeOptions}
                labelAccessor="name"
                valueAccessor="value"
                selectedOption={rangeOptions.find(
                  (opt) => opt.value === filters.noticeRange
                )}
                onChange={(val) =>
                  onFilterChange("noticeRange", val?.value || "All")
                }
              />

              {/* Date From */}
              <DatePicker
                label="Date From"
                value={filters.dateFrom}
                onChange={(dateStr) =>
                  onFilterChange("dateFrom", dateStr || "")
                }
              />

              {/* Date To */}
              <DatePicker
                label="Date To"
                value={filters.dateTo}
                onChange={(dateStr) =>
                  onFilterChange("dateTo", dateStr || "")
                }
              />

              {/* Reset Button */}
              <div className="col-span-full flex justify-end mt-2">
                <Button variant="primary" onClick={onResetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Filters;
