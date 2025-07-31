import { AccessibilityReport, FilterState } from '../types';

export const applyFilters = (reports: AccessibilityReport[], filters: FilterState): AccessibilityReport[] => {
  return reports.filter(report => {
    // URL search filter
    if (filters.searchUrl && !report.url.toLowerCase().includes(filters.searchUrl.toLowerCase())) {
      return false;
    }

    // Min Score filter
    if (filters.minScore && report.auditScore < parseInt(filters.minScore)) {
      return false;
    }

    // Error range filter
    if (filters.errorRange && filters.errorRange !== 'All') {
      const errorCount = report.errorCount;
      switch (filters.errorRange) {
        case '0-50':
          if (errorCount < 0 || errorCount > 50) return false;
          break;
        case '50-100':
          if (errorCount < 50 || errorCount > 100) return false;
          break;
        case '100-150':
          if (errorCount < 100 || errorCount > 150) return false;
          break;
        case '150+':
          if (errorCount < 150) return false;
          break;
      }
    }

    // Warning range filter
    if (filters.warningRange && filters.warningRange !== 'All') {
      const warningCount = report.warningCount;
      switch (filters.warningRange) {
        case '0-50':
          if (warningCount < 0 || warningCount > 50) return false;
          break;
        case '50-100':
          if (warningCount < 50 || warningCount > 100) return false;
          break;
        case '100-150':
          if (warningCount < 100 || warningCount > 150) return false;
          break;
        case '150+':
          if (warningCount < 150) return false;
          break;
      }
    }

    // Notice range filter
    if (filters.noticeRange && filters.noticeRange !== 'All') {
      const noticeCount = report.noticeCount;
      switch (filters.noticeRange) {
        case '0-50':
          if (noticeCount < 0 || noticeCount > 50) return false;
          break;
        case '50-100':
          if (noticeCount < 50 || noticeCount > 100) return false;
          break;
        case '100-150':
          if (noticeCount < 100 || noticeCount > 150) return false;
          break;
        case '150+':
          if (noticeCount < 150) return false;
          break;
      }
    }

    // Max Warnings filter (keeping for backward compatibility)
    if (filters.maxWarnings && filters.maxWarnings !== 'All') {
      const maxWarnings = parseInt(filters.maxWarnings);
      if (report.warningCount > maxWarnings) {
        return false;
      }
    }

    // Notices filter (keeping for backward compatibility)
    if (filters.notices && filters.notices !== 'All') {
      const maxNotices = parseInt(filters.notices);
      if (report.noticeCount > maxNotices) {
        return false;
      }
    }

    // Standard filter
    if (filters.standard && filters.standard !== 'All' && report.wcagStandard !== filters.standard) {
      return false;
    }

    // Guidelines filter (text search)
    if (filters.guidelines && !report.wcagStandard.toLowerCase().includes(filters.guidelines.toLowerCase())) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      const reportDate = new Date(report.createdOn);
      
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        if (reportDate < fromDate) {
          return false;
        }
      }

      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // Include the entire day
        if (reportDate > toDate) {
          return false;
        }
      }
    }

    return true;
  });
};




export const formatDate = (dateString: string, timezone: string): string => {
  const date = new Date(dateString);

  const timezoneMap: Record<string, string> = {
  'Local Time (Asia/Calcutta)': 'Asia/Kolkata',
  'UTC': 'UTC',
  'Pacific Time (US)': 'America/Los_Angeles',
  'Eastern Time (US)': 'America/New_York',
  'Central European Time': 'Europe/Berlin',
  'Japan Standard Time': 'Asia/Tokyo',
  'Australian Eastern Time': 'Australia/Sydney',
  'Greenwich Mean Time': 'Etc/GMT',
  'Singapore Time': 'Asia/Singapore',
  'Dubai Time': 'Asia/Dubai',

  // 🇨🇦 Canadian Zones
  'Pacific Time (Canada)': 'America/Vancouver',
  'Mountain Time (Canada)': 'America/Edmonton',
  'Central Time (Canada)': 'America/Winnipeg',
  'Eastern Time (Canada)': 'America/Toronto',
  'Atlantic Time (Canada)': 'America/Halifax',
  'Newfoundland Time': 'America/St_Johns',
};


  const resolvedTimeZone = timezoneMap[timezone] || 'UTC';

  return date.toLocaleString('en-US', {
    timeZone: resolvedTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '');
};
