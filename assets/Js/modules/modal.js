const toggleModal = (modal) => {
    modal.classList.toggle("active");
};

const generateModalContent = (modalContent, dataFunction) => {
    modalContent.innerHTML = '';
    let content = '';

    content = createProject(dataFunction, content)

    modalContent.innerHTML = content;

    const toggleTriggers = modalContent.querySelectorAll('.toggle-modal');
    toggleTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => toggleModal(modalContent.parentElement));
    });

    const addStepBtn = modalContent.querySelector('.add-input-group-btn button');
    if (addStepBtn) {
        addStepBtn.addEventListener('click', addProjectStep);
    }

}
function createProject(dataFunction) {

    if(dataFunction === 'create-project') {
        return `
        <h3>Créer votre projet</h3>
        <button class="close-modal-btn toggle-modal">X</button>
        <form action="">
            <div class="input-group input-title">
                <label for="project-title">Titre du projet :</label>
                <input type="text" id="project-title" class="project-title animated-input">
            </div>
            <div class="project-steps-group">
                <div class="input-group">
                    <input type="text" id="project-step" class="project-step animated-input" placeholder="Étape :">
                </div>
            </div>
            <div class="add-input-group-btn">
                <button class="secondary-btn" type="button">Ajouter une étape</button>
            </div>
            <button class="create-project-btn primary-btn toggle-modal" type="button">Valider</button>
        </form>
        `
    }
}

const addProjectStep = () => {
    console.log("click");
    const projectStepsGroup = document.querySelector('.project-steps-group');
    const newStep = document.createElement('div');
    newStep.className = 'input-group';
    newStep.innerHTML = `
        <input type="text" id="project-step" class="project-step animated-input" placeholder="Étape :">
    `;
    projectStepsGroup.appendChild(newStep);
};

export { toggleModal, generateModalContent, addProjectStep };