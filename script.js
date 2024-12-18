let allQuotes = []; // To store all loaded quotes
let uniqueAuthors = new Set(); // To store unique authors

function loadQuotes() {
    fetch("quotes.txt")
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            const quotesContainer = document.getElementById("quotes-container");
            const filterSelect = document.getElementById("filter-select");
            allQuotes = [];
            uniqueAuthors.clear();

            lines.forEach(line => {
                if (line.trim()) {
                    const [quote, author] = line.split(" - ");
                    const quoteDiv = document.createElement("div");
                    quoteDiv.classList.add("quote", "mb-3");
                    quoteDiv.innerHTML = `
                        <h3>${quote}</h3>
                        <p>- ${author}</p>
                    `;
                    quotesContainer.appendChild(quoteDiv);
                    allQuotes.push({ quote, author });
                    if (author) uniqueAuthors.add(author.trim());
                }
            });

            uniqueAuthors.forEach(author => {
                const option = document.createElement("option");
                option.value = author.toLowerCase();
                option.textContent = author;
                filterSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading quotes:", error));
}

function filterQuotes() {
    const filterValue = document.getElementById("filter-select").value.toLowerCase();
    const quotesContainer = document.getElementById("quotes-container");
    quotesContainer.innerHTML = "";

    allQuotes.forEach(({ quote, author }) => {
        if (!filterValue || (author && author.toLowerCase().includes(filterValue))) {
            const quoteDiv = document.createElement("div");
            quoteDiv.classList.add("quote", "mb-3");
            quoteDiv.innerHTML = `
                <h3>${quote}</h3>
                <p>- ${author}</p>
            `;
            quotesContainer.appendChild(quoteDiv);
        }
    });
}

window.onload = loadQuotes;
