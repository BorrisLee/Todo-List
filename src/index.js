// import
import { createTodoList } from './todoList/todoList';
import { Project } from './objects/project';
import { Task } from './objects/task';

// test project: Default
const p1 = Project('Default');
const t1 = Task('Buy new clothes', 'Hat, T-shirt, Jeans', '25-08-2020', 'high');
p1.tasks.push(t1);
localStorage.setItem(p1.name, JSON.stringify(p1));

// test project: Groceries
const p2 = Project('Groceries');
const t2 = Task('Buy Bread', 'Whole Wheat', '25-08-2020', 'high');
p2.tasks.push(t2);
localStorage.setItem(p2.name, JSON.stringify(p2));

// start todo list app
const todoList = createTodoList();
const body = document.querySelector('body');
body.appendChild(todoList);