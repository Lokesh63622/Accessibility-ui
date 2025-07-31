import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import { FilterState, AccessibilityReport } from './types';
import { applyFilters } from './utils/filters';
// import { sampleReports } from './data/sampleData'; ← REMOVE
import { fetchAccessibilityReports } from '../src/services/fetchAccessibilityReports'; // ✅ NEW

const initialFilters: FilterState = {
  minScore: '',
  maxWarnings: 'All',
  notices: 'All',
  standard: 'All',
  guidelines: '',
  dateFrom: '',
  dateTo: '',
  timezone: 'Local Time (Asia/Calcutta)',
  searchUrl: '',
  errorRange: 'All',
  warningRange: 'All',
  noticeRange: 'All'
};

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [allReports, setAllReports] = useState<AccessibilityReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<AccessibilityReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      const data = await fetchAccessibilityReports();
      console.log("scdnvdc",data);
      setAllReports(data);
      setFilteredReports(applyFilters(data, filters));
      setLoading(false);
    }
    loadReports();
  }, []);

  useEffect(() => {
    const filtered = applyFilters(allReports, filters);
    setFilteredReports(filtered);
  }, [filters, allReports]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Web Accessibility Reports
          </h1>
          <p className="text-center text-gray-600">
            Comprehensive WCAG compliance testing results and analytics
          </p>
        </div>

        <Filters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredReports.length}</span> of{' '}
              <span className="font-semibold">{allReports.length}</span> reports
            </p>
            <div className="text-sm text-gray-500">
              Timezone: {filters.timezone}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading reports...</p>
        ) : (
          <DataTable 
            reports={filteredReports} 
            timezone={filters.timezone}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
