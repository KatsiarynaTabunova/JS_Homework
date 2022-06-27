import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Edit extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.urlParts.id);
    }

    async render() {
        let html;

        if (this.isEditEnable()) {
            const {id, title} = this.task;

            html = `
                <h1 class="page-title">Task Edit</h1>
                
                <div class="task-edit">
                    <p>
                        <b>Task Title:</b>
                        <input class="task-edit__title" type="text" value="${title}">
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
        this.task && location.hash.split('edit')[1] === '' && this.setActions();
    }

    isEditEnable() {
        return this.task && location.hash.split('edit')[1] === '';
    }

    setActions() {
        const taskTitleInput = document.getElementsByClassName('task-edit__title')[0],
			saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        taskTitleInput.onkeyup = () => saveTaskBtn.disabled = !taskTitleInput.value.trim();
        saveTaskBtn.onclick = () => this.editTask(taskTitleInput);
    }

    editTask(taskTitleInput) {
        this.task.title = taskTitleInput.value.trim();
        Tasks.setTasksToLS(this.tasks);

        this.redirectToTaskInfo();
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;