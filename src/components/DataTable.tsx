import React from "react";
import { Table } from "pixel-react"; // Adjust if using a different import
import { ExternalLink } from "lucide-react";
import { formatDate } from "../utils/filters";
import { downloadFile } from "../services/downloadService";
import { AccessibilityReport } from "../types";

interface DataTableProps {
  reports: AccessibilityReport[];
  timezone: string;
}

const CircularProgress: React.FC<{ score: number }> = ({ score }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90
      ? "#059669"
      : score >= 80
      ? "#3b82f6"
      : score >= 70
      ? "#d97706"
      : "#dc2626";

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} stroke="#e5e7eb" strokeWidth="3" fill="none" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
        {score}
      </div>
    </div>
  );
};

const DataTable: React.FC<DataTableProps> = ({ reports, timezone }) => {
  const columns = [
    {
      accessor: "url",
      header: "URL",
      width: 250,
      cell: ({ row }: any) => (
        <a
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline block truncate max-w-[220px]"
          title={row.url}
        >
          {row.url}
        </a>
      ),
    },
    {
      accessor: "auditScore",
      header: "Audit Score",
      width: 120,
      cell: ({ row }: any) => <CircularProgress score={row.auditScore} />,
    },
    {
      accessor: "errorCount",
      header: "Errors",
      width: 100,
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {row.errorCount}
        </span>
      ),
    },
    {
      accessor: "warningCount",
      header: "Warnings",
      width: 100,
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {row.warningCount}
        </span>
      ),
    },
    {
      accessor: "noticeCount",
      header: "Notices",
      width: 100,
      cell: ({ row }: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.noticeCount}
        </span>
      ),
    },
    {
      accessor: "wcagStandard",
      header: "Standard",
      width: 120,
    },
    {
      accessor: "createdOn",
      header: "Created On",
      width: 150,
      cell: ({ row }: any) => formatDate(row.createdOn, timezone),
    },
    {
      accessor: "filePath",
      header: "Action",
      width: 80,
      cell: ({ row }: any) => (
        <button
          title="View and download the report"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => downloadFile(row.filePath)}
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={reports} headerType="primary" noDataContent="No data found" />;
};

export default DataTable;
