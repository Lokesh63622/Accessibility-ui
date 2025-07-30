import React, { useState } from 'react';
import { AccessibilityReport } from '../types';
import { formatDate } from '../utils/filters';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface DataTableProps {
  reports: AccessibilityReport[];
  timezone: string;
}

type SortField = 'url' | 'auditScore' | 'errorCount' | 'warningCount' | 'noticeCount' | 'wcagStandard' | 'createdOn';
type SortDirection = 'asc' | 'desc';

const DataTable: React.FC<DataTableProps> = ({ reports, timezone }) => {
  const [sortField, setSortField] = useState<SortField>('createdOn');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReports = [...reports].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'createdOn') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 border-green-200 bg-green-50';
    if (score >= 80) return 'text-blue-600 border-blue-200 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
    return 'text-red-600 border-red-200 bg-red-50';
  };

  const CircularProgress: React.FC<{ score: number }> = ({ score }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke={score >= 90 ? '#059669' : score >= 80 ? '#3b82f6' : score >= 70 ? '#d97706' : '#dc2626'}
            strokeWidth="3"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">{score}</span>
        </div>
      </div>
    );
  };

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-orange-500" /> : 
      <ChevronDown className="w-4 h-4 text-orange-500" />;
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500 text-lg">No reports found matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('url')}
              >
                <div className="flex items-center space-x-1">
                  <span>URL</span>
                  <SortIcon field="url" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('auditScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>Audit Score</span>
                  <SortIcon field="auditScore" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('errorCount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Errors</span>
                  <SortIcon field="errorCount" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('warningCount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Warnings</span>
                  <SortIcon field="warningCount" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('noticeCount')}
              >
                <div className="flex items-center space-x-1">
                  <span>Notices</span>
                  <SortIcon field="noticeCount" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('wcagStandard')}
              >
                <div className="flex items-center space-x-1">
                  <span>Standard</span>
                  <SortIcon field="wcagStandard" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer  transition-colors"
                onClick={() => handleSort('createdOn')}
              >
                <div className="flex items-center space-x-1">
                  <span>Created On</span>
                  <SortIcon field="createdOn" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={report.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {report.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CircularProgress score={report.auditScore} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {report.errorCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {report.warningCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {report.noticeCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{report.wcagStandard}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(report.createdOn, timezone)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;