
// Testing fetch with github
fetch("https://api.github.com/users/renato2r/repos")
    .then(response => response.json())
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("Error fetching data:", error));

/*************************************** API - FETCH - Star Wars ****************************************/

const API_CHARACTERS = "https://www.swapi.tech/api/people/";
const API_SPECIES = "https://www.swapi.tech/api/species/";

// Select DOM elements
const characterList = document.getElementById("character-list");
const speciesList = document.getElementById("species-list");

// Function to fetch all characters asynchronously
async function fetchAllCharacters(url) {
    try {
        let allCharacters = [];
        let nextPage = url;
        let pagesToLoad = []; // Store promises for each page

        // While there's a next page URL, fetch more data
        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextPage = data.next; //Next page, if available

            // Display characters while still loading
            data.results.forEach(character => {
                const listItem = document.createElement("li");
                listItem.textContent = character.name;
                listItem.setAttribute("data-url", character.url);
                listItem.style.cursor = "pointer";

                const detailsDiv = document.createElement("div");
                detailsDiv.style.display = "none";
                detailsDiv.classList.add("character-details");

                listItem.addEventListener("click", async () => {
                    if (detailsDiv.innerHTML === "") {
                        const characterDetails = await fetchCharacterDetails(character.url);
                        displayCharacterDetails(detailsDiv, characterDetails);
                    }
                    detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
                });

                listItem.appendChild(detailsDiv);
                characterList.appendChild(listItem);
            });
        }

        if (allCharacters.length === 0) {
            characterList.innerHTML = "<p>No characters found.</p>";
        }

    } catch (error) {
        console.error("Error fetching characters:", error);
        characterList.innerHTML = "<p>Failed to load characters.</p>";
    }
}

// Function to fetch character details
async function fetchCharacterDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error("Error fetching character details:", error);
    }
}

// Display character details inside the detailsDiv
function displayCharacterDetails(detailsDiv, character) {
    detailsDiv.innerHTML = `
        <p><strong>Height:</strong> ${character.height} cm</p>
        <p><strong>Mass:</strong> ${character.mass} kg</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
    `;
}

// Function to fetch and display species
async function fetchAllSpecies(url) {
    try {
        let allSpecies = [];
        let nextPage = url;

        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            allSpecies = allSpecies.concat(data.results);
            nextPage = data.next;
        }

        if (allSpecies.length === 0) {
            speciesList.innerHTML = "<p>No species found.</p>";
            return;
        }

        allSpecies.forEach(species => {
            const listItem = document.createElement("li");
            listItem.textContent = species.name;
            listItem.setAttribute("data-url", species.url);
            listItem.style.cursor = "pointer";

            const detailsDiv = document.createElement("div");
            detailsDiv.style.display = "none";
            detailsDiv.classList.add("species-details");

            listItem.addEventListener("click", async () => {
                if (detailsDiv.innerHTML === "") {
                    const speciesDetails = await fetchSpeciesDetails(species.url);
                    displaySpeciesDetails(detailsDiv, speciesDetails);
                }
                detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
            });

            listItem.appendChild(detailsDiv);
            speciesList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Error fetching species:", error);
        speciesList.innerHTML = "<p>Failed to load species.</p>";
    }
}

// Function to fetch species details
async function fetchSpeciesDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error("Error fetching species details:", error);
    }
}

// Exibir detalhes dentro do detailsDiv
function displaySpeciesDetails(detailsDiv, species) {
    detailsDiv.innerHTML = `
        <p><strong>Classification:</strong> ${species.classification}</p>
        <p><strong>Designation:</strong> ${species.designation}</p>
        <p><strong>Average Height:</strong> ${species.average_height} cm</p>
        <p><strong>Language:</strong> ${species.language}</p>
    `;
}

// Call the functions when the page loads
fetchAllCharacters(API_CHARACTERS);
fetchAllSpecies(API_SPECIES);
