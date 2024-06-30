// Import functions from modal.js
import * as Modal from "./modules/modal.js";

document.addEventListener("DOMContentLoaded", () => {

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Triggers
    const modal = document.querySelector(".modal");
    const toggleTriggers = document.querySelectorAll(".toggle-modal");
    const modalContent = modal.querySelector(".modal-content");

    toggleTriggers.forEach(toggleTrigger => {
        toggleTrigger.addEventListener("click", (e) => {
            const dataFunction = e.target.getAttribute("data-function");
            Modal.generateModalContent(modalContent, dataFunction);
            Modal.toggleModal(modal);

            const createProjectBtn = modalContent.querySelector(".create-project-btn");
            if (createProjectBtn) {
                createProjectBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleCreateProjectBtn(modal);
                });
            }
        });
    });

    const tableTasks = document.querySelector('.table-tasks');

    const handleCreateProjectBtn = (modal) => {
        const projectTitle = modal.querySelector('#project-title').value;
        const stepElements = modal.querySelectorAll('.project-step');
        const steps = Array.from(stepElements).map(step => ({
            projectStep: step.value,
            completed: false
        }));

        const newProject = {
            title: projectTitle,
            steps: steps,
            completed: false
        };

        // Update the projects array in the parent scope
        projects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(projects));
        console.log('Project added:', newProject);

        displayProjects();
    };

    const displayProjects = () => {
        tableTasks.innerHTML = '';
        projects.forEach((project, projectIndex) => {
            layoutProject(tableTasks, project, projectIndex);
        });
    };

    const layoutProject = (tableTasks, project, projectIndex) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('table-item');
        projectElement.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <hr>
            <form class="steps-checkpoints-form">
            </form>
            <button class="close-project-button primary-btn" data-project-index="${projectIndex}">Finir projet</button>
        `;

        const stepsCheckpointsForm = projectElement.querySelector(".steps-checkpoints-form");
        project.steps.forEach((step, stepIndex) => {
            const checkpoint = document.createElement('div');
            checkpoint.classList.add('checkpoint');
            checkpoint.innerHTML = `
                <input type="checkbox" ${step.completed ? 'checked' : ''} data-project-index="${projectIndex}" data-step-index="${stepIndex}">
                <span>${step.projectStep}</span>
            `;
            stepsCheckpointsForm.appendChild(checkpoint);

            const checkbox = checkpoint.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                step.completed = checkbox.checked;
                updateProjectCompletion(project, projectElement);
                localStorage.setItem("projects", JSON.stringify(projects));
            });
        });

        tableTasks.appendChild(projectElement);

        updateProjectCompletion(project, projectElement);

        const closeProjectBtn = projectElement.querySelector('.close-project-button');
        closeProjectBtn.addEventListener('click', () => {
            // Remove the project from the array
            projects.splice(projectIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            displayProjects(); // Update UI after removing project
        });
    };

    const updateProjectCompletion = (project, projectElement) => {
        const allCompleted = project.steps.every(step => step.completed);
        project.completed = allCompleted;
        if (allCompleted) {
            // Remove project from UI and array
            projects = projects.filter(p => p !== project);
            localStorage.setItem("projects", JSON.stringify(projects));
            displayProjects();
        } else {
            projectElement.classList.remove('completed-project');
        }
    };

    displayProjects();

});
