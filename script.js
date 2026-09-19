'use strict';

const projects = [
    {
        title: 'School Project',
        description: 'A website project created as part of my school activities.',
        tags: ['school', 'web'],
        year: 2026
    },
    {
        title: 'Portfolio Website',
        description: 'My personal portfolio showcasing my skills, interests, and work.',
        tags: ['web'],
        year: 2026
    },
    {
        title: 'Photography Project',
        description: 'A creative project inspired by my interest in photography.',
        tags: ['photography'],
        year: 2026
    },
    {
        title: 'JavaScript Practice',
        description: 'A small project created while learning JavaScript and interactive websites.',
        tags: ['school', 'web'],
        year: 2026
    }
];

function filterProjects(projectList, searchText, category) {
    const search = searchText.trim().toLowerCase();

    if (search === '' && category === 'all') {
        return projectList;
    }

    return projectList.filter(function (project) {
        const title = project.title.toLowerCase();
        const description = project.description.toLowerCase();
        const tags = project.tags.join(' ').toLowerCase();

        const matchesSearch =
            search === '' ||
            title.includes(search) ||
            description.includes(search) ||
            tags.includes(search);

        const matchesCategory =
            category === 'all' ||
            project.tags.includes(category);

        return matchesSearch && matchesCategory;
    });
}

function renderProjects(projectList) {
    const container = document.querySelector('#project-list');
    const count = document.querySelector('#count');

    if (!Array.isArray(projectList)) {
        container.innerHTML =
            '<li class="no-results">Something went wrong. Please try again.</li>';

        count.textContent = '';
        return;
    }

    if (projectList.length === 0) {
        container.innerHTML =
            '<li class="no-results">No projects matched your search. Try something else.</li>';

        count.textContent = 'Showing 0 projects.';
        return;
    }

    let projectHTML = '';

    for (const project of projectList) {
        const title = project.title || 'Untitled project';
        const description = project.description || 'No description available.';
        const year = project.year || 'Year not listed';
        const tags = Array.isArray(project.tags)
            ? project.tags.join(' • ')
            : 'No tags available';

        projectHTML += `
            <li class="project-card">
                <span class="project-year">${year}</span>
                <h3>${title}</h3>
                <p>${description}</p>
                <span class="project-tags">${tags}</span>
            </li>
        `;
    }

    container.innerHTML = projectHTML;

    const word = projectList.length === 1 ? 'project' : 'projects';
    count.textContent = `Showing ${projectList.length} ${word}.`;
}

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');

function updateProjects() {
    const filteredProjects = filterProjects(
        projects,
        searchInput.value,
        categorySelect.value
    );

    renderProjects(filteredProjects);
}

renderProjects(projects);

searchInput.addEventListener('input', updateProjects);

categorySelect.addEventListener('change', updateProjects);
