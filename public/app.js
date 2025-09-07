// public/app.js
const form = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const list = document.getElementById("todo-list");

async function fetchTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();
  render(todos);
}

function render(todos) {
  list.innerHTML = "";
  for (const t of todos) {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    if (t.completed) li.classList.add("completed");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!t.completed;
    cb.className = "checkbox";
    cb.addEventListener("change", () => toggleComplete(t.id, cb.checked));

    const span = document.createElement("span");
    span.textContent = t.title;
    span.style.flex = "1";

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "btn";
    del.addEventListener("click", () => deleteTodo(t.id));

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
}

async function addTodo(title) {
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  await fetchTodos();
}

async function toggleComplete(id, completed) {
  await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  await fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  await fetchTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  addTodo(title);
  titleInput.value = "";
});

fetchTodos();
