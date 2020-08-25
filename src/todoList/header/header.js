// imports
import { createMenu } from './menu/menu';
import { createHeaderText } from './headerText/headerText';
import { createNewProjectButton } from './newProjectButton/newProjectButton';

const createHeader = () => {

    // create wrapper dom
    const wrapper = document.createElement('div');
    wrapper.classList.add('header');

    // get menu
    const menu = createMenu();

    // get title
    const title = createHeaderText();

    // get new project button
    const newProjectButton = createNewProjectButton();

    // append components to wrapper
    wrapper.appendChild(menu);
    wrapper.appendChild(title);
    wrapper.appendChild(newProjectButton);

    // return header
    return wrapper;
};

export { createHeader };