import TodoDelete from './components/delete';
import Todo from './components/todo';
import P from './components/p';
import {
  openDB
} from 'idb';
import checkConnectivity from './connection.js';

let todoList = [];
let todoQueue = [];
(async function (document) {
  const app = document.querySelector('#app');
  const list = document.querySelector('#list');
  const title = document.querySelector('#title');
  const content = document.querySelector('#content');
  const submit = document.querySelector('#submit');

  checkConnectivity(3, 1000);

  try {
    const data = await fetch('http://localhost:3000/todos');
    const json = await data.json();
    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('todos', {
          autoIncrement: true,
        });
      }
    });

    document.addEventListener('connection-changed', async ({
      detail
    }) => {
      if (detail.online) {
        if (todoQueue.length > 0) {
          todoQueue.forEach(todo => {
            fetch('http://localhost:3000/todos', {
              method: 'POST',
              body: JSON.stringify(todo),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          })
        }
        todoQueue = [];
      }
    });

    todoList.push(...json);

    if (navigator.onLine) {
      await database.put('todos', json, 'todos');
    }
    submit.addEventListener('click', () => post(title.value, content.value, database, list));

    refreshList(database, list);
    app.appendChild(title);
    app.appendChild(content);
    app.appendChild(submit);
    app.appendChild(list);
  } catch (error) {
    console.log(error);
  }
})(document);

const refreshList = async (database, list) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  const todos = await database.get('todos', 'todos');

  todos && todos.forEach(to => {
    const delButton = TodoDelete();
    const todo = Todo();
    const p = P();
    delButton.dataset.id = to.id;
    p.textContent = `${to.title}: ${to.content}`
    list.appendChild(todo);
    todo.appendChild(p);
    todo.appendChild(delButton);
    delButton.addEventListener('click', (e) => del(e, database, list));
  });
}

const post = async (title, content, database, list) => {
  const todo = {
    id: !todoList.length ? 1 : todoList[todoList.length - 1].id + 1,
    title,
    content
  };
  todoList.push(todo);

  await database.put('todos', todoList, 'todos').then(() => refreshList(database, list));
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(err => err && todoQueue.push(todo));
}

const del = async (e, database, list) => {
  const idToDelete = e.target.dataset.id;
  todoList = todoList.filter(todo => todo.id != idToDelete);

  await database.put('todos', todoList, 'todos').then(() => refreshList(database, list));
  fetch(`http://localhost:3000/todos/${idToDelete}`, {
    method: 'DELETE',
  });
}
