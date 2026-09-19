// My project data
const projects = [
    {
        name: "School Project",
        description: "A website project created as part of my school work.",
        technology: "HTML & CSS",
        category: "school"
    },
    {
        name: "Web Practice",
        description: "A small website I made while practicing web development.",
        technology: "HTML & CSS",
        category: "coding"
    },
    {
        name: "Photography Ideas",
        description: "A collection of ideas for photography projects and creative shots.",
        technology: "Creative Project",
        category: "photography"
    },
    {
        name: "Portfolio Website",
        description: "My personal portfolio showcasing my work, interests, and skills.",
        technology: "HTML, CSS & JavaScript",
        category: "web"
    }
];


// Takes a search value and RETURNS a filtered list.
// This function does NOT touch the page.
function filterProjects(searchValue) {
    const search = searchValue.trim().toLowerCase();

    if (search === "") {
        return projects;
    }

    return projects.filter(function (project) {
        return (
            project.name.toLowerCase().includes(search) ||
            project.description.toLowerCase().includes(search) ||
            project.technology.toLowerCase().includes(search) ||
            project.category.toLowerCase().includes(search)
        );
    });
}


// Draws the projects into the empty container.
function displayProjects(projectList) {
    const container = document.getElementById("project-list");
    const message = document.getElementById("project-message");

    container.innerHTML = "";

    // Guard against bad or empty data
    if (!Array.isArray(projectList) || projectList.length === 0) {
        message.textContent = "No projects found. Try a different search.";
        return;
    }

    message.textContent = "";

    projectList.forEach(function (project, index) {

        // Extra guard so undefined values never appear on the page
        const name = project.name || "Untitled project";
        const description = project.description || "No description available.";
        const technology = project.technology || "Technology not listed";

        const card = document.createElement("article");
        card.className = "project-card";

        card.innerHTML = `
            <span class="project-number">PROJECT ${String(index + 1).padStart(2, "0")}</span>
            <h3>${name}</h3>
            <p>${description}</p>
            <span class="project-tag">${technology}</span>
        `;

        container.appendChild(card);
    });
}


// Initial display
displayProjects(projects);


// Listen for changes in the search box
const searchInput = document.getElementById("project-search");

searchInput.addEventListener("input", function () {
    const newList = filterProjects(searchInput.value);
    displayProjects(newList);
});