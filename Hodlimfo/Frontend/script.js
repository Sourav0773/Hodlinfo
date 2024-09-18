window.onload = async () => {
    try {
        // API call from node js
        const response = await fetch('http://localhost:3000/tickers'); 
        const data = await response.json();

        // Get the table body element
        const tableBody = document.querySelector('#crypto-table tbody');
        
        // Clear existing rows if any
        tableBody.innerHTML = '';

        // For each data add a row to the table
        data.forEach((crypto, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td> 
                    <td>${crypto.name}</td>
                    <td>₹ ${crypto.last}</td>
                    <td>₹ ${crypto.buy}</td>
                    <td>₹ ${crypto.sell}</td>
                    <td>${crypto.volume}</td>
                    <td>${crypto.base_unit}</td>
                </tr>
            `;
            tableBody.innerHTML += row; // Adding rows to the table body
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
