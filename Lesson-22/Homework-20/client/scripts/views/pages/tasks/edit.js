import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Edit extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    async getData() {
        this.task = await this.model.getTask(this.urlParts.id);

        return this.task;
    }
	
    async render(task) {
        let html;

        if (this.isEditEnable()) {
            const {id, title, description} = task;

            html = `
                <h1 class="page-title">Task Edit</h1>
                
                <div class="task-edit">
                    <p>
                        <b>Task Title:</b>
                        <input class="task-edit__title" type="text" value="${title}">
                    </p>
                    <p>
                        <b>Task Description:</b>
                        <textarea class="task-edit__description">${(description === 'No Description') ? '' : description}</textarea>
                    </p>
            
                    <div class="task-edit__buttons">
                        <button class="task-edit__btn-save button">Save Task</button>
                        <a class="task-edit__btn-back button" href="#/task/${id}">Back to Info</a>
                    </div>
                </div>
            `;
        } else {
            html = new Error404().render();
        }
			
        return html;
    }

    async afterRender() {
       this.isEditEnable() && this.setActions();
    }

	isEditEnable() {
		return !this.task.error &&
               this.task.status !== 'Done' &&
               !location.hash.split(this.urlParts.action)[1];
	}

    setActions() {
        const taskTitleField = document.getElementsByClassName('task-edit__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-edit__description')[0],
			saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        taskTitleField.onkeyup = () => saveTaskBtn.disabled = !taskTitleField.value.trim();
        saveTaskBtn.onclick = () => this.editTask(taskTitleField, taskDescriptionField);
    }

    async editTask(taskTitleField, taskDescriptionField) {
        this.task.title = taskTitleField.value.trim();
        this.task.description = taskDescriptionField.value.trim();
	
		await this.model.editTask(this.task);

        this.redirectToTaskInfo();
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;