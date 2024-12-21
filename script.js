let allQuotes = []; // Store all quotes fetched from the Google Sheet

// Fetch quotes from Google Sheets
async function fetchQuotes() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxwZCjh4F-JufqLYulZ47ZdJmT1MWJOwI0M_op_Y_JOoDiGK71PoxOcnokoxhpouPvG/exec"; // Replace with your Google Apps Script URL

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update the global quotes array
        allQuotes = data;

        // Populate the filter dropdown
        populateFilterOptions(data);

        // Display all quotes by default
        displayQuotes(data);
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Populate the filter dropdown with unique author names
function populateFilterOptions(data) {
    const filterSelect = document.getElementById("filter-select");
    filterSelect.innerHTML = ""; // Clear existing options

    const uniqueAuthors = new Set(data.map(item => item.author));
    filterSelect.innerHTML += `<option value="">All</option>`; // Default "All" option

    uniqueAuthors.forEach(author => {
        if (author && author.trim()) {
            filterSelect.innerHTML += `<option value="${author}">${author}</option>`;
        }
    });
}

// Display filtered quotes
function filterQuotes() {
    const filterValue = document.getElementById("filter-select").value;
    const filteredQuotes = filterValue
        ? allQuotes.filter(item => item.author === filterValue)
        : allQuotes; // Show all if no filter is applied
    displayQuotes(filteredQuotes);
}

// Render quotes on the page
function displayQuotes(data) {
    const quotesContainer = document.getElementById("quotes-container");
    quotesContainer.innerHTML = ""; // Clear current quotes

    data.forEach(({ quote, author }) => {
        const quoteDiv = document.createElement("div");
        quoteDiv.classList.add("quote", "mb-3");
        quoteDiv.innerHTML = `
            <h3>${quote}</h3>
            <p>- ${author}</p>
        `;
        quotesContainer.appendChild(quoteDiv);
    });
}

// Load quotes and initialize functionality on page load
window.onload = fetchQuotes;
