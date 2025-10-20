// Select DOM Elements
const input = document.getElementById("todo-Input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-List");

// Try to load saved todos from LocalStorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save current todos array to LocalStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a DOM node for a todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement("li");

    // Checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? "line-through" : "none";
        saveTodos();
    });

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    // Add double-click Event-Listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete todo button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// Render the whole todo list from todos array
function render() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        todoList.appendChild(node);
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = "";
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e)=> {
    if (e.key === 'Enter') {
        addTodo();
    }
});
render();
