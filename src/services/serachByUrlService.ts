// services/searchByUrl.ts
import axios from 'axios';
import { AccessibilityReport } from '../types';

const SEARCH_API_URL = 'http://localhost:8210/optimize/v3/api/accessibility/url';
const AUTH_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export async function searchAccessibilityByUrl(url: string): Promise<AccessibilityReport | null> {
  try {
    const response = await axios.get(SEARCH_API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      params: {
        url,
      },
    });

    const data = response.data.responseObject;

    if (!data) {
      console.error('Unexpected API response format:', data);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error searching by URL:', error);
    return null;
  }
}
