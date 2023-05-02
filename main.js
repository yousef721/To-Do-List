let input = document.querySelector(".input");
let submitButton = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let clear = document.querySelector(".clear");

// Empty Array To Storage Tasks
let taskArray = []

// Check if Theres Tasks In Local Storage
if (window.localStorage.getItem("tasks")) {
    taskArray = JSON.parse(window.localStorage.getItem("tasks"))
}

// Trigger Get Data From Local Storage Function
getTaskFromLocalStorage()

submitButton.addEventListener("click", (e) => {
    e.preventDefault() 
    if (input.value !== "") {
        addTaskToArray(input.value) // Add Task To Array 
        input.value = "" // Empty Input Field
    }
})

// Click On Task Element
tasks.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("delete")) {
        // Remove Task From Local Storage
        deleteTask(e.target.parentElement.getAttribute("data-id"))
        // Remove Element From Task Div
        e.target.parentElement.remove()
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleTask(e.target.getAttribute("data-id"))
        // Toggle Done
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskValue) {
    // Task Data
    const task = {
        id: Date.now(),
        tittle: taskValue,
        completed: false,
    };
    // Push Task To Array
    taskArray.push(task)
    // Add Task To Array
    addElementsToPage(taskArray)
    // Add Task To LocalStorage 
    setTaskToLocaStorage(taskArray)
}

function addElementsToPage(element) {
    // Empty Div Tasks
    tasks.innerHTML = "";
    // Looping On Array Of Tasks 
    element.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task is Done
        if (task.completed) {
        div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.tittle))
        // Create Delete Button
        let buttonDelete = document.createElement("button");
        buttonDelete.className = "delete";
        buttonDelete.appendChild(document.createTextNode("Delete"))
        // Append Button To Div
        div.appendChild(buttonDelete)
        // Append Task To Div Tasks
        tasks.appendChild(div)
    });
}

function setTaskToLocaStorage(task) {
    window.localStorage.setItem("tasks", JSON.stringify(task))
}

function getTaskFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPage(tasks)
    }
}

function deleteTask(taskId) {
    taskArray = taskArray.filter((task) => task.id != taskId)
    setTaskToLocaStorage(taskArray)
}

function toggleTask(taskId) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == taskId) {
            taskArray[i].completed == false 
            ? (taskArray[i].completed = true) 
            : (taskArray[i].completed = false);
        }
    }
    setTaskToLocaStorage(taskArray)
}

// Clear All Tasks
clear.addEventListener("click", () => {
    window.localStorage.removeItem("tasks")
    tasks.innerHTML = "";
    taskArray = []
});

