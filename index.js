
// Testando o fetch para garantir que está funcionando
fetch("https://api.github.com/users/renato2r/repos")
    .then(response => response.json())
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("Error fetching data:", error));

/*************************************** API - FETCH - Star Wars ****************************************/

const projectSection = document.getElementById("board");
const projectList = projectSection.querySelector("ul");


/*Creating fetch*/

fetch(`https://www.swapi.tech/api/people/`) //url api
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Could not retrieve repositories`);
        }
        return response.json(); // Convert response to JSON
    })
    .then(repositories => {
        if (repositories.length === 0) {
            console.log("No repositories found");
        } else {
            console.log("Repositories loaded successfully:", repositories);
            /* repositories.forEach(repo => {
               const project = document.createElement("li");
               project.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
               projectList.appendChild(project);
             }); 
             */
        }
    })
    .catch(error => {
        console.error("An error occurred while fetching the repositories:", error);
    });



