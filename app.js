
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskbtn = document.getElementById("addTaskBtn")



function getTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
}


function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    const tasks = getTasksFromStorage();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");
        
            li.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasksToStorage(tasks);
            renderTasks();
            updateProgressBar();
        });


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasksToStorage(tasks);
            renderTasks();
            updateProgressBar();

        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
            const newText = prompt("Edit Your Task", task.text)
            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                saveTasksToStorage(tasks);
                renderTasks();
                updateProgressBar();
            }
        };

        const buttondiv=document.createElement("div")
        buttondiv.className="buttonsContainer";
        buttondiv.append(editBtn,deleteBtn);
     
        li.appendChild(buttondiv);
        taskList.appendChild(li);
    });
    updateProgressBar();
}

function updateProgressBar() {
    const tasks = getTasksFromStorage();
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const progressText = document.getElementById("progressText");
    progressText.textContent = `${completed} / ${total}`;
}


addTaskbtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!!");
        return;
    }
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    saveTasksToStorage(tasks);
    taskInput.value = "";
    renderTasks();
    updateProgressBar();
})


renderTasks();






// function addTaskbtn() {
//     const value = taskInput.value.trim();
//     if (value === "") {
//         alert("Please enter a task!!");
//         return;
//     }

//     const newList = document.createElement('li');
//     newList.textContent = value;
//     newList.addEventListener("click", () => {
//         newList.classList.toggle("completed")
//     });

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = "Delete";
//     deleteBtn.className = "delete-btn";
//     deleteBtn.onclick = () => newList.remove();

//     newList.appendChild(deleteBtn);
//     taskList.appendChild(newList);

//     taskInput.value = "";

// }