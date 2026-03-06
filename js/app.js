// Feature 8: Persistent Storage (localStorage)
const STORAGE_KEY = 'todoListDemo_tasks';

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initial Data based on the design mock if nothing is stored
  return [
    {
      id: 1,
      time: "4:50 PM",
      date: "",
      priority: "Medium",
      title: "Project retrospective",
      status: "incomplete",
      subtasks: []
    },
    {
      id: 2,
      time: "4:50 PM",
      date: "",
      priority: "Medium",
      title: "Evening team meeting",
      status: "incomplete",
      subtasks: []
    },
    {
      id: 3,
      time: "Today",
      date: "",
      priority: "High",
      title: "Create monthly deck",
      status: "incomplete",
      subtasks: []
    },
    {
      id: 4,
      time: "6:00 PM",
      date: "",
      priority: "Medium",
      title: "Shop for groceries",
      status: "incomplete",
      subtasks: [
        "Pick up bag",
        "Rice",
        "Meat"
      ]
    },
    {
      id: 5,
      time: "Yesterday",
      date: "",
      priority: "Low",
      category: "Personal Notes",
      title: "Read book",
      status: "complete",
      subtasks: []
    }
  ];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();
let currentFilter = 'all'; // Feature 4: Task Filtering
let currentSearch = '';    // Feature 7: Search Functionality

// Reference DOM elements
const taskListEl = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskModal = document.getElementById('taskModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');
const newTaskTitle = document.getElementById('newTaskTitle');
const newTaskDate = document.getElementById('newTaskDate');
const newTaskCategory = document.getElementById('newTaskCategory');
const newTaskPriority = document.getElementById('newTaskPriority');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const addSubtaskBtn = document.getElementById('addSubtaskBtn');
const subtasksList = document.getElementById('subtasksList');

// Function to render tasks
function renderTasks() {
  taskListEl.innerHTML = '';

  // Apply Filters & Search
  let filteredTasks = tasks.filter(task => {
    // Filter by status (Feature 4)
    if (currentFilter !== 'all' && task.status !== currentFilter) return false;

    // Filter by search keyword (Feature 7)
    if (currentSearch && !task.title.toLowerCase().includes(currentSearch.toLowerCase())) return false;

    return true;
  });

  if (filteredTasks.length === 0) {
    taskListEl.innerHTML = `<li class="task-item" style="justify-content:center; color: var(--text-secondary);">No tasks found</li>`;
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'complete' ? 'completed' : ''}`;

    let subtasksHtml = '';
    if (task.subtasks && task.subtasks.length > 0) {
      subtasksHtml = `<div class="task-subtasks">
                ${task.subtasks.map(st => `<span><i class="fa-solid fa-angle-right" style="font-size:10px; margin-right:6px"></i> ${st}</span>`).join('')}
            </div>`;
    }

    // Format display time/date (Feature 5)
    let displayTime = task.time;
    if (task.date) {
      const d = new Date(task.date);
      displayTime = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + (task.time && task.time !== 'Today' ? ', ' + task.time : '');
    }

    // Priority Badge (Feature 6)
    let priorityHtml = '';
    if (task.priority) {
      priorityHtml = `<span class="priority-badge priority-${task.priority}">${task.priority}</span>`;
    }

    // Category Badge (Feature 16)
    let categoryHtml = '';
    if (task.category) {
      categoryHtml = `<span class="category-badge">${task.category}</span>`;
    }

    li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.status === 'complete' ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <div class="task-content">
                <div class="task-title">${categoryHtml}${task.title} ${priorityHtml}</div>
                <div class="task-time"><i class="fa-regular fa-clock"></i> ${displayTime}</div>
                ${subtasksHtml}
            </div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete Task">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        `;
    taskListEl.appendChild(li);
  });
}

// 1. Feature: Toggle Task Completion
window.toggleTask = function (id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = task.status === 'complete' ? 'incomplete' : 'complete';
    saveTasks();
    renderTasks();
  }
};

// 2. Feature: Delete a Task
window.deleteTask = function (id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
};

// 3, 5, 6. Feature: Add New Task (with Due Date and Priority)
addTaskBtn.addEventListener('click', () => {
  taskModal.classList.add('active');
  setTimeout(() => { newTaskTitle.focus(); }, 100);
});

closeModalBtn.addEventListener('click', () => {
  taskModal.classList.remove('active');
  resetModal();
});

taskModal.addEventListener('click', (e) => {
  if (e.target === taskModal) {
    taskModal.classList.remove('active');
    resetModal();
  }
});

function resetModal() {
  newTaskTitle.value = '';
  newTaskDate.value = '';
  newTaskCategory.value = 'Work Related';
  newTaskPriority.value = 'Medium';
  subtasksList.innerHTML = '';
}

// Handle adding subtask inputs dynamically
addSubtaskBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent accidental form submissions/refreshes if in a form
  const li = document.createElement('li');
  li.className = 'subtask-edit-item';
  li.innerHTML = `
        <input type="text" class="subtask-input" placeholder="Subtask description">
        <button class="remove-subtask-btn"><i class="fa-solid fa-minus"></i></button>
    `;

  li.querySelector('.remove-subtask-btn').addEventListener('click', (e) => {
    e.preventDefault();
    li.remove();
  });

  subtasksList.appendChild(li);
  li.querySelector('.subtask-input').focus();
});

saveTaskBtn.addEventListener('click', () => {
  const title = newTaskTitle.value.trim();
  const date = newTaskDate.value;
  const category = newTaskCategory.value;
  const priority = newTaskPriority.value;

  // Collect subtasks
  const subtaskInputs = subtasksList.querySelectorAll('.subtask-input');
  const newSubtasks = Array.from(subtaskInputs)
    .map(input => input.value.trim())
    .filter(val => val !== '');

  if (title) {
    const newTask = {
      id: Date.now(),
      time: date ? '' : "Today", // fallback if no date
      date: date,
      category: category,
      priority: priority,
      title: title,
      status: "incomplete",
      subtasks: newSubtasks
    };
    tasks.unshift(newTask); // Add to top of list
    saveTasks();
    renderTasks();

    taskModal.classList.remove('active');
    resetModal();
  }
});

newTaskTitle.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') saveTaskBtn.click();
});

// Feature 4: Filter Logic
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTasks();
  });
});

// Feature 7: Search Logic
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderTasks();
  });
}

// Feature 11: Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem('todoListDemo_theme', isDark ? 'dark' : 'light');
}

// Check saved theme or system preference
const savedTheme = localStorage.getItem('todoListDemo_theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggleBtn.addEventListener('click', () => {
  setTheme(!body.classList.contains('dark-mode'));
});

// Initial Render
renderTasks();
