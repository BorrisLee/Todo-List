const createHeaderText = () => {

    // create h1 dom
    const headerText = document.createElement('h1');
    headerText.classList.add('project-name');
    headerText.textContent = 'Default';

    // return h1 dom
    return headerText;
};

export { createHeaderText };