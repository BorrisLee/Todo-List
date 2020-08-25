// imports
import { Project } from '../objects/project';
import { Task } from '../objects/task';
import { createTaskList } from '../todoList/taskList/taskList';

const addNewProject = name => {

    // create new project object
    const project = Project(name);

    // add project to localstorage
    localStorage.setItem(project.name, JSON.stringify(project));
};

const addNewTask = (projectName, taskTitle, taskDescription, taskDueDate, taskPriority) => {

    // get project matching input name
    const project = JSON.parse(localStorage.getItem(projectName));

    // create new task
    const task = Task(taskTitle, taskDescription, taskDueDate, taskPriority);

    // push new task to project task list
    project.tasks.push(task);

    // save project
    localStorage.setItem(projectName, JSON.stringify(project));
};

const removeTask = (projectName, taskTitle, taskDescription, taskDueDate, taskPriority) => {

    // get project
    const project = JSON.parse(localStorage.getItem(projectName));

    // search project for matching task
    for (let i = 0; i < project.tasks.length; i++) {

        if (project.tasks[i].title === taskTitle &&
            project.tasks[i].description === taskDescription &&
            project.tasks[i].due === taskDueDate &&
            project.tasks[i].priority === taskPriority) {

            // remove task
            project.tasks.splice(i, 1);

            // exit loop
            break;
        }
    }

    // save project
    localStorage.setItem(project.name, JSON.stringify(project));
}

const getProjectList = () => {

    // create empty list
    const projectList = [];

    // iterate through localstorage
    for (let i = 0; i < localStorage.length; i++) {

        // convert and push project to list
        projectList.push(JSON.parse(localStorage.getItem(localStorage.key([i]))));
    }

    // return list of projects
    return projectList;
};

const getTaskList = projectName => {

    // get project from localstorage
    const project = JSON.parse(localStorage.getItem(projectName));

    // return project's task list
    return project.tasks;
};

const updateProjectTitle = name => {

    // get h1 dom
    const projectName = document.querySelector('.project-name');
    projectName.textContent = name;
};

const refreshProjectList = () => {
    console.log('TODO: Refresh Project List.');
};

const refreshTaskList = () => {

    // rebuild task list dom
    let oldTaskList = document.querySelector('.task-list');
    const newTaskList = createTaskList(document.querySelector('.project-name').textContent);
    oldTaskList = newTaskList;
};

export { addNewProject, addNewTask, removeTask, getProjectList, getTaskList, updateProjectTitle, refreshProjectList, refreshTaskList };