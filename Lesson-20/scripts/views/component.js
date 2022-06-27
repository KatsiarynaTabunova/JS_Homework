import {parseCurrentURL} from '../helpers/utils.js';

import Tasks from '../models/tasks.js';

class Component {
    constructor() {
        this.urlParts = parseCurrentURL();
        this.tasks = new Tasks().getTasksFromLS();
    }

    async afterRender() {}
}

export default Component;