import React from 'react';
import { FilterState } from '../types';
import { Calendar, Clock, Search } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* First Row - Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Search className="w-4 h-4 mr-1" />
            Search by URL:
          </label>
          <input
            type="text"
            placeholder="Enter URL to search..."
            value={filters.searchUrl}
            onChange={(e) => onFilterChange('searchUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Score:</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="0"
            value={filters.minScore}
            onChange={(e) => onFilterChange('minScore', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Standard:</label>
          <select
            value={filters.standard}
            onChange={(e) => onFilterChange('standard', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="WCAG2A">WCAG2A</option>
            <option value="WCAG2AA">WCAG2AA</option>
            <option value="WCAG2AAA">WCAG2AAA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guidelines:</label>
          <input
            type="text"
            placeholder="Search guidelines..."
            value={filters.guidelines}
            onChange={(e) => onFilterChange('guidelines', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Second Row - Range Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 pt-4 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Errors Range:</label>
          <select
            value={filters.errorRange}
            onChange={(e) => onFilterChange('errorRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-150">100-150</option>
            <option value="150+">150+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Warnings Range:</label>
          <select
            value={filters.warningRange}
            onChange={(e) => onFilterChange('warningRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-150">100-150</option>
            <option value="150+">150+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notices Range:</label>
          <select
            value={filters.noticeRange}
            onChange={(e) => onFilterChange('noticeRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="0-50">0-50</option>
            <option value="50-100">50-100</option>
            <option value="100-150">100-150</option>
            <option value="150+">150+</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onResetFilters}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Third Row - Date and Timezone Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            Date From:
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            Date To:
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            Display Timezone:
          </label>
          <select
            value={filters.timezone}
            onChange={(e) => onFilterChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="Local Time (Asia/Calcutta)">Local Time (Asia/Calcutta)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;