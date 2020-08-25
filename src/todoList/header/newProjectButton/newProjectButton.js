// imports
import { addNewProject } from '../../../utilities/utilities';
import { populateProjectList } from '../menu/menu';

const createNewProjectButton = () => {

    // create img dom
    const img = document.createElement('img');
    img.classList.add('new-project-icon');
    img.setAttribute('src', './images/new-project-icon.svg');

    // add click event
    img.addEventListener('click', () => {

        // check for null overlay
        if (!document.querySelector('.new-project-modal-overlay')) {
            createNewProjectModal();
        }

        // display overlay
        toggleNewProjectModal();
    });

    return img
};

const toggleNewProjectModal = () => {

    // get overlay dom
    const overlay = document.querySelector('.new-project-modal-overlay');

    // hide overlay
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    }

    // show overlay
    else {
        overlay.style.display = 'block';
    }
};

const createNewProjectModal = () => {

    // get body element
    const body = document.querySelector('body');

    // create overlay dom
    const overlay = document.createElement('div');
    overlay.classList.add('new-project-modal-overlay');

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('new-project-modal');

    // append form to wrapper
    wrapper.appendChild(createNewProjectModalForm());

    // append wrapper to overlay
    overlay.appendChild(wrapper);

    // append overlay to body
    body.appendChild(overlay);
};

const createNewProjectModalForm = () => {

    // create form
    const form = document.createElement('form');
    form.classList.add('new-project-form');

    // create label
    const projectNameLabel = document.createElement('label');
    projectNameLabel.classList.add('label-project-name');
    projectNameLabel.setAttribute('for', 'input-project-name');
    projectNameLabel.textContent = 'Enter Project Name:';

    // create text input
    const projectNameInput = document.createElement('input');
    projectNameInput.classList.add('input-project-name');
    projectNameInput.setAttribute('id', 'input-project-name');

    // create submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('button-add-project');
    submitButton.textContent = 'Add';

    // create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button-cancel-project');
    cancelButton.textContent = 'Cancel';

    // submit click event
    submitButton.addEventListener('click', e => {

        // stop page refresh
        e.preventDefault();

        // create new project
        addNewProject(projectNameInput.value);

        // get project list
        const projectList = document.querySelector('.project-list');

        // populate project list
        populateProjectList(projectList);

        // empty input field
        projectNameInput.value = '';

        // hide overlay after add
        document.querySelector('.new-project-modal-overlay').style.display = 'none';
    });

    // cancel click event
    cancelButton.addEventListener('click', e => {

        // stop page refresh
        e.preventDefault();

        // empty input field
        projectNameInput.value = '';

        // hide modal
        document.querySelector('.new-project-modal-overlay').style.display = 'none';
    });

    // append components
    form.appendChild(projectNameLabel);
    form.appendChild(projectNameInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    // return new project form
    return form;
}

export { createNewProjectButton };