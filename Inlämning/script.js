const BASE_URL = "https://jsonplaceholder.typicode.com/todos";
const todos = [];

const todoList = document.querySelector("#todo-list");
const form = document.querySelector("#form");
const input = document.querySelector("#todo-input");

const getTodos = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  console.log(data);
  data.forEach((todo) => {
    todos.push(todo);
  });
  listTodos();
};

getTodos();

const listTodos = () => {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });
};

const createTodoElement = (todoData) => {
  let todo = document.createElement("div");
  todo.id = todoData.id;
  todo.classList.add("todo");

  let title = document.createElement("p");
  title.classList.add("todo-title");
  title.innerText = todoData.title;

  let button = document.createElement("button");
  button.classList.add("delete");
  button.innerText = "Delete";

  todo.appendChild(title);
  todo.appendChild(button);

  return todo;
};

const validateForm = () => {
  if (input.value.trim() === "") {
    console.log("Du måste skriva en todo");
    input.classList.add("error");
    input.classList.remove("succes");
    return false;
  } else {
    input.classList.add("success");
    input.classList.remove("error");
    return true;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodo = {
    title: input.value,
  };

  fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      todos.push(data);

      const todoElement = createTodoElement(data);
      todoList.appendChild(todoElement);
    });

  validateForm();
};

todoList.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    e.target.parentElement.remove();
  }

  fetch(BASE_URL + e.target.id, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      e.target.remove();
      const index = todos.findIndex((todo) => todo.id == e.target.id);
      todos.splice(index, 1);
      console.log(todos);
    }
  });
});

form.addEventListener("submit", handleSubmit);
