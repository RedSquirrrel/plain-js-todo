const addForm = document.querySelector('.addTodo');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const date = document.querySelector('.date');

let taskList;
const generateTemplate = () => {
  let taskListShow = list;

  let html = '';
  let localItems = JSON.parse(localStorage.getItem('todos'));

  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  taskList.forEach((todo, index) => {
    html += `
        <li class="list-group-item d-flex justify-content-between align-items-center" id=${index}>
           <span>${todo}</span>
           <i onClick="() => deleteTodos(${index})" class="far fa-trash-alt delete"></i>           
       </li>
    `;
  });
  taskListShow.innerHTML = html;
};

const addTodo = e => {
  e.preventDefault();
  let localItems = JSON.parse(localStorage.getItem('todos'));

  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  const todo = addForm.add.value.trim();
  taskList.push(todo);
  console.log(taskList);
  localStorage.setItem('todos', JSON.stringify(taskList));

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
};

const deleteTodos = index => {
  if (index.target.classList.contains('delete')) {
    const www = Number(index.target.parentElement.id);
    taskList.splice(www, 1);
    localStorage.setItem('todos', JSON.stringify(taskList));

    let generateListID = index.target.parentNode.id;
    document.getElementById(generateListID).remove();
  }
};

const completedTodos = e => {
  if (e.target.parentElement.tagName === 'LI') {
    e.target.classList.toggle('completed');
  }
};

const filterTodos = () => {
  const term = search.value.trim().toLowerCase();
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

// event listenters
addForm.addEventListener('submit', addTodo);
list.addEventListener('click', deleteTodos);
list.addEventListener('click', completedTodos);
search.addEventListener('keyup', filterTodos);

date.textContent = new Date().getFullYear();
generateTemplate();
