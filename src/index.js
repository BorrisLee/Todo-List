// import
import { createTodoList } from './todoList/todoList';
import { Project } from './objects/project';
import { Task } from './objects/task';

// get default project
const defaultProject = JSON.parse(localStorage.getItem('Default'));

// null check
if(!defaultProject) {

    // create a new default project
    const newDefaultProject = Project('Default');

    // create a sample task
    const sampleTask = Task('Sample Task', 'A detailed description of the sample task', '01-09-2020', 'low');
    newDefaultProject.tasks.push(sampleTask);

    localStorage.setItem(newDefaultProject.name, JSON.stringify(newDefaultProject));
}

// start todo list app
const todoList = createTodoList();
const body = document.querySelector('body');
body.appendChild(todoList);