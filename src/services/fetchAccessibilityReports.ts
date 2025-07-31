
// services/fetchReports.ts
import axios from 'axios';
import { AccessibilityReport } from '../types';

const API_URL = 'https://dev2.fireflink.com/executionresult/optimize/v3/accessibility/all-filtered';
const AUTH_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
export async function fetchAccessibilityReports(): Promise<AccessibilityReport[]> {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    const data = response.data.responseObject;

    // ✅ Make sure data is actually an array
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
