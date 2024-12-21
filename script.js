async function fetchQuotes() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxwZCjh4F-JufqLYulZ47ZdJmT1MWJOwI0M_op_Y_JOoDiGK71PoxOcnokoxhpouPvG/exec"; // Replace with your Google Apps Script URL

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const quotesContainer = document.getElementById("quotes-container");
        quotesContainer.innerHTML = ""; // Clear existing quotes

        data.forEach(({ quote, author }) => {
            const quoteDiv = document.createElement("div");
            quoteDiv.classList.add("quote", "mb-3");
            quoteDiv.innerHTML = `
                <h3>${quote}</h3>
                <p>- ${author}</p>
            `;
            quotesContainer.appendChild(quoteDiv);
        });
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Fetch quotes when the page loads
window.onload = fetchQuotes;
