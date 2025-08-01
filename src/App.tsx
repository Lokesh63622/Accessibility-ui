import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import { FilterState, AccessibilityReport } from './types';
import { applyFilters } from './utils/filters';
import { fetchAccessibilityReports } from '../src/services/fetchAccessibilityReports';
import Loader from './components/Loader';

const PAGE_SIZE = 10;

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
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Load initial data
  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      const data = await fetchAccessibilityReports(page, PAGE_SIZE);
      setAllReports(data);
      setFilteredReports(applyFilters(data, filters));
      setLoading(false);
      setHasMore(data.length === PAGE_SIZE);
    }
    loadReports();
  }, []);

  // Filter whenever filters or reports change
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

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && !loading && !isFetchingMore && hasMore) {
          fetchMoreReports();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, isFetchingMore, hasMore]);

  const fetchMoreReports = useCallback(async () => {
    setIsFetchingMore(true);
    const nextPage = page + 1;
    const moreData = await fetchAccessibilityReports(nextPage, PAGE_SIZE);
    setAllReports(prev => [...prev, ...moreData]);
    setPage(nextPage);
    setIsFetchingMore(false);
    if (moreData.length < PAGE_SIZE) {
      setHasMore(false);
    }
  }, [page]);

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
          <>
            <DataTable
              reports={filteredReports}
              timezone={filters.timezone}
            />
            <div ref={loadMoreRef} className="h-10" />
            {isFetchingMore && (
              <p className="text-center text-sm text-gray-500 mt-2">Loading more...</p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
