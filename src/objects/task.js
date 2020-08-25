const Task = (title, description, dueDate, priority) => {
    return { title, description, due: dueDate, priority };
};

export { Task };