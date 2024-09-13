export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
    "space-y-6"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  const form = document.createElement('form')
  form.classList.add(
    'w-1/2',
    'bg-white',
    'flex',
    'flex-col',
    'items-center',
    'border',
    'rounded-lg',
    'p-6',
    'space-y-4'
  )

  const titleForm = document.createElement('h3')
  titleForm.classList.add('text-center', 'text-xl')
  titleForm.textContent = 'Create Task'

  const inputTitle = document.createElement('input')
  inputTitle.classList.add('p-2', 'border', 'border-gray-200', 'rounded', 'text-gray-700', 'w-full')
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('placeholder', 'Title')

  const inputCompleteContainer = document.createElement('div');
  inputCompleteContainer.classList.add('flex', 'items-center', 'space-x-2')

  const inputComplete = document.createElement('input')
  inputComplete.classList.add('rounded')
  inputComplete.setAttribute('type', 'checkbox');

  const labelComplete = document.createElement("label");
  labelComplete.classList.add("text-gray-700", "font-medium");
  labelComplete.textContent = "Is complete?";

  inputCompleteContainer.appendChild(labelComplete);
  inputCompleteContainer.appendChild(inputComplete);

  const buttonTask = document.createElement('button');
  buttonTask.classList.add('rounded', 'bg-blue-700', 'text-white', 'w-full', 'p-2', 'hover:bg-blue-900');
  buttonTask.textContent = 'Submit'

  form.appendChild(titleForm)
  form.appendChild(inputTitle);
  form.appendChild(inputCompleteContainer)
  form.appendChild(buttonTask)

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = inputTitle.value;
    const completed = inputComplete.checked;
    
    if (!title) {
      alert('Ingrese el título');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed }),
        credentials: 'include',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Tarea creada exitosamente');
        
        if (result.newTask && result.newTask.id) {
          addTaskToTable(result.newTask);
        } else {
          console.error('El objeto de la tarea es inválido:', result);
        }
        
        inputTitle.value = '';
        inputComplete.checked = false;
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('No se pudo crear la tarea');
    }
  });
  

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

    const btnUpdate = document.createElement("button");
    btnUpdate.classList.add("bg-yellow-500", "text-white", "p-2", "rounded", "hover:bg-yellow-600", "mr-2");
    btnUpdate.textContent = "Update";
    btnUpdate.addEventListener("click", () => {
      handleUpdate(task);
    });

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("bg-red-500", "text-white", "p-2", "rounded", "hover:bg-red-600");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => {
      handleDelete(task.id, tr);
    });

    td5.appendChild(btnUpdate);
    td5.appendChild(btnDelete);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  };

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Actions";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5)

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  fetch("http://localhost:4000/todos", {
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {

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

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(form)
  container.appendChild(table);

  return container;
};
