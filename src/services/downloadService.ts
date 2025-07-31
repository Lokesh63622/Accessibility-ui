import axios from 'axios';

export const downloadFile = async (filePath: string) => {
 const AUTH_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
  try {
    const response = await axios.post(
      'https://dev2.fireflink.com/project/optimize/v1/file/download/file',
      {
        contentType: '',
        filePath: [filePath],
      },
      {
        responseType: 'blob', // Important for downloading files
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Origin': 'https://dev2.fireflink.com',
          'Referer': 'https://dev2.fireflink.com/app/repository/elements?elementType=project-elements&platformType=Web',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0',
          'accept': 'application/json, text/plain, image/*, */*',
          'authorization': `Bearer ${AUTH_TOKEN}`,
          'content-type': 'application/json',
          'licensetype': 'C-Professional',
          'projectid': 'PJT1164',
          'projectname': 'Nlp Test',
          'projecttype': 'Web & Mobile',
          'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'timezone': 'Asia/Kolkata',
        },
      }
    );
  // Create a blob from response
  const blob = new Blob([response.data], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // 1. Open in a new tab
  window.open(url, '_blank');

  // 2. Trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = filePath.split('/').pop() || 'report.html';
  document.body.appendChild(a);
  a.click();
  a.remove();

  // 3. Cleanup after a short delay
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 5000);

} catch (error) {
  console.error('Error processing HTML report:', error);
  alert('Failed to open or download the report.');
}
};
