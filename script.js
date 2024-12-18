// Password for accessing the quote board
const correctPassword = "Perchance"; // Replace this with your password

// Function to check the password
function checkPassword() {
    const userPassword = document.getElementById("password").value;

    if (userPassword === correctPassword) {
        // Show the quote board and hide the password page
        document.getElementById("password-page").style.display = "none";
        document.getElementById("quote-board").style.display = "block";
        loadQuotes(); // Load the quotes
    } else {
        alert("Incorrect password. Please try again.");
    }
}

document.getElementById("password").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission (if any)
        checkPassword(); // Call the checkPassword function
    }
});

let allQuotes = []; // To store all loaded quotes
let uniqueAuthors = new Set(); // To store unique authors

// Function to fetch quotes from a text file and display them
function loadQuotes() {
    fetch("quotes.txt") // Fetch the quotes.txt file
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n"); // Split the file into lines
            const quotesContainer = document.getElementById("quotes-container");
            const filterSelect = document.getElementById("filter-select");
            allQuotes = []; // Reset the quotes array
            uniqueAuthors.clear(); // Reset the set of unique authors

            lines.forEach(line => {
                if (line.trim()) { // Ignore empty lines
                    const [quote, author] = line.split(" - "); // Split quote and author

                    const quoteDiv = document.createElement("div");
                    quoteDiv.classList.add("quote", "mb-3");
                    quoteDiv.innerHTML = `
                        <h3>${quote}</h3>
                        <p>- ${author}</p>
                    `;

                    quotesContainer.appendChild(quoteDiv);
                    allQuotes.push({ quote, author }); // Add quote to the array
                    if (author) uniqueAuthors.add(author.trim());
                }
            });

            // Clear previous options and add the "All" option
            filterSelect.innerHTML = `<option value="">All</option>`;
            
            // Populate the dropdown menu with unique author names
            uniqueAuthors.forEach(author => {
                const option = document.createElement("option");
                option.value = author.toLowerCase();
                option.textContent = author;
                filterSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading quotes:", error));
}

// Function to filter quotes by author's first name
function filterQuotes() {
    const filterValue = document.getElementById("filter-select").value.toLowerCase();
    const quotesContainer = document.getElementById("quotes-container");
    quotesContainer.innerHTML = ""; // Clear the container

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

// Show the password page on load
document.getElementById("password-page").style.display = "block";
