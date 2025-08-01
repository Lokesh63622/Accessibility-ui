
// services/fetchReports.ts
import axios from 'axios';
import { AccessibilityReport } from '../types';

const API_URL = 'https://dev2.fireflink.com/executionresult/optimize/v3/accessibility/all-filtered';
const AUTH_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export async function fetchAccessibilityReports(
  pageNumber: number,
  pageSize: number,
  searchUrl?: string
): Promise<AccessibilityReport[]> {
  try {
    console.log("check params", pageNumber, pageSize, searchUrl);

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      params: {
        pageNumber,
        pageSize,
        ...(searchUrl ? { url: searchUrl } : {})  // Add `url` param only if provided
      },
    });

    const data = response.data.responseObject;

    if (!Array.isArray(data)) {
      console.error('Unexpected API response format:', data);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}
