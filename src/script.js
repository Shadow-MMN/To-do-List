const form = document.getElementById("form");
const list = document.getElementById("list");
const toDo = document.getElementById("to-do");

// Get existing tasks from localStorage or initialize an empty array
let listArr = JSON.parse(localStorage.getItem("list")) || [];

// Display tasks when page loads
displayTasks();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let task = toDo.value.trim();
    if (!task) return; // Prevent empty tasks

    // Retrieve latest tasks from localStorage
    listArr = JSON.parse(localStorage.getItem("list")) || [];

    // Add new task
    listArr.push(task);
    localStorage.setItem("list", JSON.stringify(listArr)); // Save to localStorage

    displayTasks(); // Update the UI
    toDo.value = ""; // Clear input field
});

function displayTasks() {
    const listArr2 = JSON.parse(localStorage.getItem("list")) || [];
    list.innerHTML = ""; // Clear previous content

    listArr2.forEach((task, index) => {
        list.innerHTML += `
            <li class="flex justify-between">
                ${task} 
                <button class="remove-btn" data-id="${index}"> ❌ </button>
            </li>`;
    });

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", removeTask);
    });
}

function removeTask(event) {
    const taskIndex = event.target.getAttribute("data-id"); // Get index from dataset

    listArr = JSON.parse(localStorage.getItem("list")) || []; // Refresh listArr
    listArr.splice(taskIndex, 1); // Remove task from array
    localStorage.setItem("list", JSON.stringify(listArr)); // Save updated list to localStorage

    displayTasks(); // Refresh UI
}

// Load tasks when page refreshes
displayTasks();
