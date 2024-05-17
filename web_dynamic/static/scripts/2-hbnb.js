document.addEventListener('DOMContentLoaded', function () {
  const HOST = 54.172.62.80;
  const apiUrl = 'http://${HOST}:5001/api/v1/status/';

  // Function to fetch API status and update div#api_status
  async function checkApiStatus () {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const status = data.status;

      const apiStatusElement = document.querySelector('#api_status');

      if (status === 'OK') {
        apiStatusElement.classList.add('available');
      } else {
        apiStatusElement.classList.remove('available');
      }
    } catch (error) {
      console.error('Error fetching API status:', error);
    }
  }

  // Call checkApiStatus on page load
  checkApiStatus();

  // Refresh API status every 10 seconds
  setInterval(checkApiStatus, 10000);
});
