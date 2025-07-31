export interface AccessibilityReport {
  id: string;
  reportPath: string;
  url: string;
  wcagStandard: string;
  auditScore: number;
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  createdOn: string;
  filePath:string;
}

export interface FilterState {
  minScore: string;
  maxWarnings: string;
  notices: string;
  standard: string;
  guidelines: string;
  dateFrom: string;
  dateTo: string;
  timezone: string;
  searchUrl: string;
  errorRange: string;
  warningRange: string;
  noticeRange: string;
}