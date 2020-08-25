// imports
import { addNewTask, refreshTaskList } from '../../utilities/utilities';

const createNewTaskButton = () => {

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('new-task-button');
    wrapper.textContent = '+';

    // add click event
    wrapper.addEventListener('click', () => {

        // // check for null overlay
        if (!document.querySelector('.new-task-modal-overlay')) {
            createNewTaskModal();
        }

        // display overlay
        toggleNewTaskModal();
    });

    return wrapper;
};

const toggleNewTaskModal = () => {

    // get overlay dom
    const overlay = document.querySelector('.new-task-modal-overlay');

    // hide overlay
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    }

    // show overlay
    else {
        overlay.style.display = 'block';
    }
};

const createNewTaskModal = () => {

    // get body element
    const body = document.querySelector('body');

    // create overlay dom
    const overlay = document.createElement('div');
    overlay.classList.add('new-task-modal-overlay');

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('new-task-modal');

    // append form to wrapper
    wrapper.appendChild(createNewTaskModalForm());

    // append wrapper to overlay
    overlay.appendChild(wrapper);

    // append overlay to body
    body.appendChild(overlay);
};

const createNewTaskModalForm = () => {

    // create form
    const form = document.createElement('form');
    form.classList.add('new-task-form');

    // create task title dom
    const taskTitleLabel = document.createElement('label');
    taskTitleLabel.classList.add('label-task-title');
    taskTitleLabel.setAttribute('for', 'input-task-title');
    taskTitleLabel.textContent = 'Task Name:';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.classList.add('input-task-title');
    taskTitleInput.setAttribute('id', 'input-task-title');

    // create task description dom
    const taskDescriptionLabel = document.createElement('label');
    taskDescriptionLabel.classList.add('label-task-description');
    taskDescriptionLabel.setAttribute('for', 'input-task-description');
    taskDescriptionLabel.textContent = 'Description:';

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.classList.add('input-task-description');
    taskDescriptionInput.setAttribute('id', 'input-task-description');

    // create task due date dom
    const taskDueDateLabel = document.createElement('label');
    taskDueDateLabel.classList.add('label-task-due-date');
    taskDueDateLabel.setAttribute('for', 'input-task-due-date');
    taskDueDateLabel.textContent = 'Due Date:';

    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.classList.add('input-task-due-date');
    taskDueDateInput.setAttribute('id', 'input-task-due-date');

    // create task priority dom
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.classList.add('label-task-priority');
    taskPriorityLabel.setAttribute('for', 'input-task-priority');
    taskPriorityLabel.textContent = 'Priority:';

    const taskPriorityInput = document.createElement('input');
    taskPriorityInput.classList.add('input-task-priority');
    taskPriorityInput.setAttribute('id', 'input-task-priority');

    // create submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('button-add-task');
    submitButton.textContent = 'Add';

    // create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('button-cancel-task');
    cancelButton.textContent = 'Cancel';

    // submit click event
    submitButton.addEventListener('click', e => {

        // stop page refresh
        e.preventDefault();

        // get current project name
        const projectName = document.querySelector('.project-name').textContent;

        // add task to current project
        addNewTask(projectName, taskTitleInput.value, taskDescriptionInput.value, taskDueDateInput.value, taskPriorityInput.value);

        // refresh task list dom
        refreshTaskList();

        // reset input fields
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';
        taskPriorityInput.value = '';

        // hide overlay
        toggleNewTaskModal();
    });

    // cancel click event
    cancelButton.addEventListener('click', e => {

        // stop page refresh
        e.preventDefault();

        // empty out all input fields
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
        taskDueDateInput.value = '';
        taskPriorityInput.value = '';

        // hide modal
        toggleNewTaskModal();
    });

    // append components
    form.appendChild(taskTitleLabel);
    form.appendChild(taskTitleInput);
    form.appendChild(taskDescriptionLabel);
    form.appendChild(taskDescriptionInput);
    form.appendChild(taskDueDateLabel);
    form.appendChild(taskDueDateInput);
    form.appendChild(taskPriorityLabel);
    form.appendChild(taskPriorityInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    // return new project form
    return form;
};

export { createNewTaskButton };