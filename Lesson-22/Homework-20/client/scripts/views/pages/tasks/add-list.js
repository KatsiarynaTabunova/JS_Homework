import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    async getData() {
        return await this.model.getTasksList();
    }

    async render(tasks) {
        return `
            <h1 class="page-title">Tasks List</h1>
        
            <div class="task-add">
                <input class="task-add__title" type="text" placeholder="Task title">
                <textarea class="task-add__description" placeholder="Task description"></textarea>
             
                <button class="task-add__btn-add button" disabled>Add Task</button>
            </div>
     
            <div class="tasks">
                <div class="tasks__additional">
                    <p class="tasks__counter"></p>
                    
                    <button class="tasks__btn-clear button" ${!tasks.length ? 'disabled' : ''}>
                        Clear Tasks List
                    </button>
                </div>
                
                <div class="tasks__list">
                    ${tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.setActions();

        this.countTasksAmount();
    }

    setActions() {
        const taskTitleField = document.getElementsByClassName('task-add__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-add__description')[0],
            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            tasksContainer = document.getElementsByClassName('tasks')[0],
            clearTasksListBtn = tasksContainer.getElementsByClassName('tasks__btn-clear')[0],
            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0];

        taskTitleField.onkeyup = () => addTaskBtn.disabled = !taskTitleField.value.trim();
        addTaskBtn.onclick = () => this.addTask(taskTitleField, taskDescriptionField, addTaskBtn,
            clearTasksListBtn, tasksList);

        tasksContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('tasks__btn-clear'):
                    this.clearTasksList(tasksList, clearTasksListBtn);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-done'):
                    this.changeTaskStatus(target.parentNode.parentNode,
                        target.previousElementSibling, target);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(tasksList, target.parentNode.parentNode, clearTasksListBtn);
                    break;
            }
        };
    }

    async addTask(taskTitleField, taskDescriptionField, addTaskBtn, clearTasksListBtn, tasksList) {
        let newTask = {
            title: taskTitleField.value.trim(),
            description: taskDescriptionField.value.trim(),
        };

        newTask = await this.model.addTask(newTask);

        this.clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn);
        clearTasksListBtn.disabled && (clearTasksListBtn.disabled = false);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));

        this.countTasksAmount();
    }

    getTaskHTML(task) {
        const statusDone = task.status === 'Done';

        return `
            <div class="task ${statusDone ? 'task_done' : ''}" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                	${!statusDone ?
            `<a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a>
                    	 <a class="task__btn-done button">Done</a>`
            : ''}
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn) {
        taskTitleField.value = '';
        taskDescriptionField.value = '';
        addTaskBtn.disabled = true;
    }

    countTasksAmount() {
        const tasksCounter = document.getElementsByClassName('tasks__counter')[0],
            totalAmount = document.getElementsByClassName('task').length,
            doneAmount = document.getElementsByClassName('task_done').length,
            toBeVerbForm = (doneAmount === 1) ? 'is' : 'are',
            taskWordForm = (doneAmount === 1) ? 'task' : 'tasks';


        tasksCounter.innerHTML = !totalAmount ?
            'Tasks list is empty' :
            `There ${toBeVerbForm} <span class="tasks__counter-done">${doneAmount}</span> ${taskWordForm} of ` +
            `<span class="tasks__counter-total">${totalAmount}</span> ${toBeVerbForm} done`;
    }

    clearTasksList(tasksList, clearTasksListBtn) {
        if (confirm('Are you sure?')) {
            clearTasksListBtn.disabled = true;
            tasksList.innerHTML = '';

            this.countTasksAmount();
            this.model.clearTasksList();
        }
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    changeTaskStatus(taskContainer, editTaskBtn, doneTaskBtn) {
        taskContainer.classList.add('task_done');
        editTaskBtn.remove();
        doneTaskBtn.remove();

        this.countTasksAmount();
        const taskId = taskContainer.dataset.id;
        this.model.updateTaskStatus(taskId, 'Done');
    }

    removeTask(tasksList, taskContainer, clearTasksListBtn) {
        if (confirm('Are you sure?')) {
            taskContainer.remove();
            !tasksList.children.length && (clearTasksListBtn.disabled = true);

            this.countTasksAmount();

            const taskId = taskContainer.dataset.id;
            this.model.removeTask(taskId);
        }
    }
}

export default AddAndList;