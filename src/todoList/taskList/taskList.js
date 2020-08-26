// imports
import { addNewTask, removeTask, refreshTaskList } from '../../utilities/utilities';

const createTaskList = projectName => {

    // get task list dom
    let taskList = document.querySelector('.task-list');

    // check for null element
    if (!taskList) {

        // create task list dom
        taskList = document.createElement('ul');
        taskList.classList.add('task-list');
    }

    // clear task list
    taskList.innerHTML = '';

    // get project matching name input
    const project = JSON.parse(localStorage.getItem(projectName));

    // iterate through project tasks
    project.tasks.forEach(task => {

        // create task list item
        const listItem = document.createElement('li');
        listItem.classList.add('task');

        // create task title dom
        const taskTitle = document.createElement('p');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        // create task due dom
        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.textContent = task.due;

        // create checkmark dom
        const checkmarkWrapper = document.createElement('div');
        checkmarkWrapper.classList.add('checkmark-button');

        const checkmark = document.createElement('img');
        checkmark.setAttribute('src', './images/checkmark-icon.svg');
        checkmark.classList.add('checkmark-icon');

        // add checkmark click event
        checkmarkWrapper.addEventListener('click', e => {

            // stop details modal from popping up
            e.stopPropagation();

            // remove task
            removeTask(projectName, task.title, task.description, task.due, task.priority);

            // refresh task list
            refreshTaskList();
        });

        // set task dom colour
        listItem.setAttribute('data-priority', task.priority);

        // add list item click event
        listItem.addEventListener('click', () => {

            // check overlay already exists
            if (document.querySelector('.task-details-modal-overlay')) {

                // update overlay
                updateTaskDetailsModal(task);
            }

            // overlay does not exist
            else {

                // create overlay
                createTaskDetailsModal(task);
            }

            // display overlay
            toggleTaskDetailsModal();
        });

        // append to list item
        checkmarkWrapper.appendChild(checkmark);

        listItem.appendChild(taskTitle);
        listItem.appendChild(taskDueDate);
        listItem.appendChild(checkmarkWrapper);

        taskList.appendChild(listItem);
    });

    return taskList;
};

const toggleTaskDetailsModal = () => {

    // get overlay dom
    const overlay = document.querySelector('.task-details-modal-overlay');

    // hide overlay
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    }

    // show overlay
    else {
        overlay.style.display = 'block';
    }
};

const createTaskDetailsModal = task => {

    // get body dom
    const body = document.querySelector('body');

    // create overlay dom
    const overlay = document.createElement('div');
    overlay.classList.add('task-details-modal-overlay');

    // create modal content wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('task-details-modal');

    // create form
    const form = document.createElement('form');
    form.setAttribute('autocomplete', 'off');

    // create task title dom
    const taskTitleLabel = document.createElement('label');
    taskTitleLabel.textContent = 'Task Name:';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.classList.add('task-details-title-input');
    taskTitleInput.value = task.title;

    // create task description dom
    const taskDescriptionLabel = document.createElement('label');
    taskDescriptionLabel.textContent = 'Description:';

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.classList.add('task-details-description-input');
    taskDescriptionInput.value = task.description;

    // create task due date dom
    const taskDueDateLabel = document.createElement('label');
    taskDueDateLabel.textContent = 'Due:';

    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.classList.add('task-details-due-date-input');
    taskDueDateInput.value = task.due;

    // create task priority dom
    const taskPriorityLabel = document.createElement('label');
    taskPriorityLabel.textContent = 'Priority:';

    const taskPriorityInput = document.createElement('input');
    taskPriorityInput.classList.add('task-details-priority-input');
    taskPriorityInput.value = task.priority;

    // append content to modal
    wrapper.appendChild(form);

    form.appendChild(taskTitleLabel);
    form.appendChild(taskTitleInput);
    form.appendChild(taskDescriptionLabel);
    form.appendChild(taskDescriptionInput);
    form.appendChild(taskDueDateLabel);
    form.appendChild(taskDueDateInput);
    form.appendChild(taskPriorityLabel);
    form.appendChild(taskPriorityInput);

    // append modal to overlay
    overlay.appendChild(wrapper);

    // append overlay to body
    body.appendChild(overlay);

    // add buttons
    addControlButtons(task);
};

const updateTaskDetailsModal = task => {

    // replace title input
    document.querySelector('.task-details-title-input').value = task.title;

    // replace description input
    document.querySelector('.task-details-description-input').value = task.description;

    // replace due date input
    document.querySelector('.task-details-due-date-input').value = task.due;

    // replace priority input
    document.querySelector('.task-details-priority-input').value = task.priority;

    // rebuild buttons
    addControlButtons(task);
};

const addControlButtons = task => {

    // get modal wrapper dom
    const wrapper = document.querySelector('.task-details-modal');

    // remove all buttons
    while (wrapper.lastChild.nodeName.toLowerCase() === 'button') {
        wrapper.removeChild(wrapper.lastChild);
    }

    // add buttons
    wrapper.appendChild(createSaveButton(task));
    wrapper.appendChild(createDeleteButton(task));
    wrapper.appendChild(createCancelButton(task));
};

const createSaveButton = task => {

    // create button dom
    const button = document.createElement('button');
    button.textContent = 'save';

    // add event
    button.addEventListener('click', e => {

        // stop page reload
        e.preventDefault();

        // save task changes
        eventSave(task);
    });

    return button;
};

const createDeleteButton = task => {

    // create button dom
    const button = document.createElement('button');
    button.textContent = 'delete';

    // add event
    button.addEventListener('click', e => {

        // stop page reload
        e.preventDefault();

        // save task changes
        eventDelete(task);
    });

    return button;
};

const createCancelButton = task => {

    // create button dom
    const button = document.createElement('button');
    button.textContent = 'cancel';

    // add event
    button.addEventListener('click', e => {

        // stop page reload
        e.preventDefault();

        // save task changes
        eventCancel(task);
    });

    return button;
};

const eventSave = task => {

    // get current project
    const project = JSON.parse(localStorage.getItem(document.querySelector('.project-name').textContent));

    // create and add new task to project
    addNewTask(project.name, document.querySelector('.task-details-title-input').value, document.querySelector('.task-details-description-input').value, document.querySelector('.task-details-due-date-input').value, document.querySelector('.task-details-priority-input').value);

    // delete old task
    eventDelete(task);
};

const eventDelete = task => {

    // get current project
    const project = JSON.parse(localStorage.getItem(document.querySelector('.project-name').textContent));

    // remove input task from project
    removeTask(project.name, task.title, task.description, task.due, task.priority);

    // reload task list
    refreshTaskList();

    // hide overlay
    toggleTaskDetailsModal();
};

const eventCancel = task => {

    // restore input fields to original values
    document.querySelector('.task-details-title-input').value = task.title;
    document.querySelector('.task-details-description-input').value = task.description;
    document.querySelector('.task-details-due-date-input').value = task.due;
    document.querySelector('.task-details-priority-input').value = task.priority;

    // hide overlay
    toggleTaskDetailsModal();
};

export { createTaskList };