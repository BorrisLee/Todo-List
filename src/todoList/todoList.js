// imports
import { createHeader } from './header/header';
import { createNewTaskButton } from './newTaskButton/newTaskButton';
import { createTaskList } from './taskList/taskList';

const createTodoList = () => {

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('todo-list');

    // get header
    const header = createHeader();

    // get new task button
    const newTaskButton = createNewTaskButton();

    // get task list
    const taskList = createTaskList('Default');

    // append components to wrapper
    wrapper.appendChild(header);
    wrapper.appendChild(newTaskButton);
    wrapper.appendChild(taskList);

    // return todo list
    return wrapper;
};

export { createTodoList };