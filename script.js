document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');

    let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            emptyState.style.display = 'block';
            taskList.style.display = 'none';
            return;
        } else {
            emptyState.style.display = 'none';
            taskList.style.display = 'block';
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center border-bottom py-3 px-2 ${task.completed ? 'task-completed' : ''}`;

            li.innerHTML = `
                        <div class="d-flex align-items-center flex-grow-1 me-3" onclick="toggleTask(${task.id})">
                            <input class="form-check-input me-3 mt-0 fs-5" type="checkbox" ${task.completed ? 'checked' : ''} style="cursor: pointer;">
                            <span class="task-text fs-6 text-break">${escapeHTML(task.text)}</span>
                        </div>
                        <button class="btn btn-outline-danger btn-sm rounded-circle" onclick="deleteTask(${task.id})" aria-label="Delete task">
                            <i class="bi bi-trash3"></i>
                        </button>
                    `;
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        taskInput.value = '';
        taskInput.focus();
    }

    window.toggleTask = function (id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    };

    window.deleteTask = function (id) {
        event.stopPropagation();
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    function saveTasks() {
        localStorage.setItem('todo_tasks', JSON.stringify(tasks));
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});
