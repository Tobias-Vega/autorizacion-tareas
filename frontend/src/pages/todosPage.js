export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "bg-gray-200",
    "space-y-6"
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600", "mb-4");
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const form = createForm();

  const table = createTable();
  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(table);

  const fetchTodos = () => {
    fetch("http://localhost:4000/todos", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        data.todos.forEach((todo) => {
          addTaskToTable(todo);
        });
      });
  };

  fetchTodos()

  return container;
};

const createForm = () => {
  const form = document.createElement("form");
  form.classList.add("w-1/2", "bg-white", "flex", "flex-col", "items-center", "border", "rounded-lg", "p-6", "space-y-4");

  const titleForm = document.createElement("h3");
  titleForm.classList.add("text-center", "text-xl");
  titleForm.textContent = "Create Task";

  const inputTitle = document.createElement("input");
  inputTitle.classList.add("p-2", "border", "border-gray-200", "rounded", "text-gray-700", "w-full");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("placeholder", "Title");

  const inputCompleteContainer = document.createElement("div");
  inputCompleteContainer.classList.add("flex", "items-center", "space-x-2");

  const inputComplete = document.createElement("input");
  inputComplete.classList.add("rounded");
  inputComplete.setAttribute("type", "checkbox");

  const labelComplete = document.createElement("label");
  labelComplete.classList.add("text-gray-700", "font-medium");
  labelComplete.textContent = "Is complete?";

  inputCompleteContainer.appendChild(labelComplete);
  inputCompleteContainer.appendChild(inputComplete);

  const buttonTask = document.createElement("button");
  buttonTask.classList.add("rounded", "bg-blue-700", "text-white", "w-full", "p-2", "hover:bg-blue-900");
  buttonTask.textContent = "Submit";

  form.appendChild(titleForm);
  form.appendChild(inputTitle);
  form.appendChild(inputCompleteContainer);
  form.appendChild(buttonTask);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = inputTitle.value;
    const completed = inputComplete.checked;

    if (!title) {
      alert("Ingrese el título");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        alert("Tarea creada exitosamente");
        addTaskToTable(result.newTask);
        inputTitle.value = "";
        inputComplete.checked = false;
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("No se pudo crear la tarea");
    }
  });

  return form;
};

const createTable = () => {
  const table = document.createElement("table");
  table.classList.add("w-1/2", "bg-white", "shadow-md", "h-[700px]", "overflow-y-scroll");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  ["ID", "Title", "Completed", "Owner Id", "Actions"].forEach(text => {
    const th = document.createElement("th");
    th.classList.add("border", "px-4", "py-2");
    th.textContent = text;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
};
const addTaskToTable = (todo) => {
  const tbody = document.querySelector("tbody");
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.classList.add("border", "px-4", "py-2");
  td1.textContent = todo.id;

  const td2 = document.createElement("td");
  td2.classList.add("border", "px-4", "py-2");
  td2.textContent = todo.title;

  const td3 = document.createElement("td");
  td3.classList.add("border", "px-4", "py-2");
  td3.textContent = todo.completed ? "Sí" : "No";

  const td4 = document.createElement("td");
  td4.classList.add("border", "px-4", "py-2");
  td4.textContent = todo.owner;

  const td5 = document.createElement("td");
  td5.classList.add("border", "px-4", "py-2");

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("bg-red-500", "text-white", "p-2", "rounded", "hover:bg-red-600", "m-1");
  btnDelete.textContent = "Delete";
  btnDelete.addEventListener("click", () => {
    taskDelete(todo.id, tr);
  });

  const btnUpdate = document.createElement("button");
  btnUpdate.classList.add("bg-green-500", "text-white", "p-2", "rounded", "hover:bg-green-600", "mr-1", "m-2");
  btnUpdate.textContent = "Update";
  btnUpdate.addEventListener("click", () => {
    openModal(todo);
  });

  td5.appendChild(btnDelete);
  td5.appendChild(btnUpdate);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  tbody.appendChild(tr);
};

const openModal = (todo) => {
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed", "top-0", "left-0", "w-full", "h-full", 
    "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center"
  );

  const modalContent = document.createElement("div");
  modalContent.classList.add("bg-white", "p-6", "rounded");

  const title = document.createElement("h3");
  title.classList.add("text-xl", "mb-4");
  title.textContent = `Edit Task ${todo.id}`;

  const inputTitle = document.createElement("input");
  inputTitle.classList.add("p-2", "border", "w-full", "mb-4");
  inputTitle.value = todo.title;

  const inputCompleteContainer = document.createElement("div");
  inputCompleteContainer.classList.add("flex", "items-center", "mb-4");

  const inputComplete = document.createElement("input");
  inputComplete.classList.add("mr-2");
  inputComplete.setAttribute("type", "checkbox");
  inputComplete.checked = todo.completed;

  const labelComplete = document.createElement("label");
  labelComplete.textContent = "Is task complete?";

  inputCompleteContainer.appendChild(inputComplete);
  inputCompleteContainer.appendChild(labelComplete);

  const buttonSave = document.createElement("button");
  buttonSave.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600", "mr-2");
  buttonSave.textContent = "Save";
  buttonSave.addEventListener("click", async () => {
    const newTitle = inputTitle.value;
    const newCompleted = inputComplete.checked;
    await updateTask(todo.id, newTitle, newCompleted);
    modal.remove();
  });

  const buttonClose = document.createElement("button");
  buttonClose.classList.add("bg-gray-500", "text-white", "p-2", "rounded", "hover:bg-gray-600");
  buttonClose.textContent = "Close";
  buttonClose.addEventListener("click", () => {
    modal.remove();
  });

  modalContent.appendChild(title);
  modalContent.appendChild(inputTitle);
  modalContent.appendChild(inputCompleteContainer);
  modalContent.appendChild(buttonSave);
  modalContent.appendChild(buttonClose);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};

const updateTask = async (id, newTitle, newCompleted) => {
  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, completed: newCompleted }),
      credentials: "include",
    });

    if (response.ok) {
      alert("Tarea actualizada");
      location.reload();
    }
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    alert("No se pudo actualizar la tarea");
  }
};


const taskDelete = async (id, tr) => {
  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      tr.remove();
      alert("Tarea eliminada");
    }
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    alert("No se pudo eliminar la tarea");
  }
};
