import {generateID} from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    async render() {
        return `     
            <h1 class="page-title">Tasks List</h1>
                
            <div class="task-add">
                <input class="task-add__title" type="text" placeholder="Task title">
                
                <button class="task-add__btn-add button" disabled>Add Task</button>
            </div>       
                  
            <div class="tasks">
                <div class="tasks__list">
                    ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                </div>
            </div>            
        `;
    }

    async afterRender() {
        this.setActions();
    }

    setActions() {
        const taskTitleInput = document.getElementsByClassName('task-add__title')[0],
			addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
			tasksContainer = document.getElementsByClassName('tasks')[0],
			tasksList = document.getElementsByClassName('tasks__list')[0];

        taskTitleInput.onkeyup = () => addTaskBtn.disabled = !taskTitleInput.value.trim();
        addTaskBtn.onclick = () => this.addTask(taskTitleInput, addTaskBtn, tasksList);

		tasksContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch(true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);
                    break;
            }
        };
    }

    addTask(taskTitleInput, addTaskBtn, tasksList) {
		const newTask = {
			id: generateID(),
			title: taskTitleInput.value.trim(),
			status: 'In Progress'
		};

        this.tasks.push(newTask);
        Tasks.setTasksToLS(this.tasks);

		this.clearAddTask(taskTitleInput, addTaskBtn);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));
    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    <a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                    <a class="task__btn-done button">Done</a> 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(taskTitleInput, addTaskBtn) {
        taskTitleInput.value = '';
        addTaskBtn.disabled = true;
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();
        }
    }
}

export default AddAndList;