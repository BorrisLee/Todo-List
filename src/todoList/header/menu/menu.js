// imports
import { getProjectList, refreshTaskList } from '../../../utilities/utilities';

const createMenu = () => {

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('menu');

    // create img dom
    const img = document.createElement('img');
    img.classList.add('menu-icon');
    img.setAttribute('src', './images/menu-icon.svg');

    // get project list dom
    const projectList = createProjectList();

    // add click event
    img.addEventListener('click', toggleProjectList);

    // append components to wrapper
    wrapper.appendChild(img);
    wrapper.appendChild(projectList);

    // return menu
    return wrapper;
};

const toggleProjectList = () => {

    // get project list dom
    const projectList = document.querySelector('.project-list');

    // hide project list
    if (projectList.style.display === 'block') {
        projectList.style.display = 'none';
    }

    // show project list
    else {
        projectList.style.display = 'block';
    }
};

const createProjectList = () => {

    // create list dom
    const list = document.createElement('ul');
    list.classList.add('project-list');

    // fill project list
    populateProjectList(list);

    // return list of projects
    return list;
};

const populateProjectList = projectListDom => {

    // clear current contents of project list
    projectListDom.innerHTML = '';

    // get list projects
    const projectList = getProjectList();

    // iterate through project list
    projectList.forEach(project => {

        // create list item for project
        const listItem = document.createElement('li');
        listItem.classList.add('project-item');

        // create paragraph for project name
        const projectName = document.createElement('p');
        projectName.textContent = project.name;

        // create delete button for project
        const deleteButton = createDeleteProjectButton(project.name);

        // append components to list item
        listItem.appendChild(projectName);
        listItem.appendChild(deleteButton);

        // add click event
        listItem.addEventListener('click', () => {

            loadProject(project.name);

            toggleProjectList();
        });

        // append list item to list
        projectListDom.appendChild(listItem);
    });
};

const createDeleteProjectButton = projectName => {

    // create img dom
    const img = document.createElement('img');
    img.classList.add('delete-icon');
    img.setAttribute('src', './images/delete-icon.svg');

    // add click event
    img.addEventListener('click', e => {

        e.stopPropagation();

        deleteProjectEvent(projectName);
    });

    return img;
};

const deleteProjectEvent = projectName => {

    // remove project from localstorage
    localStorage.removeItem(projectName);

    // get project list dom
    const projectListDom = document.querySelector('.project-list');

    // fill project list
    populateProjectList(projectListDom);
};

const loadProject = projectName => {
    
    // update header text
    document.querySelector('.project-name').textContent = projectName;

    // load project tasks
    refreshTaskList();
};

export { createMenu, populateProjectList };