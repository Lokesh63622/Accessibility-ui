
// services/fetchReports.ts
import axios from 'axios';
import { AccessibilityReport } from '../types';

const API_URL = 'https://dev2.fireflink.com/executionresult/optimize/v3/accessibility/all-filtered?pageNumber=0&pageSize=10';
const AUTH_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export async function fetchAccessibilityReports(
  pageNumber: 1,
  pageSize: 15
): Promise<AccessibilityReport[]> {
  
  try {
      console.log("check pramms",pageNumber,
        pageSize,)
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      params: {
        pageNumber,
        pageSize,
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

