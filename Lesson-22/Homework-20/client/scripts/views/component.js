import {parseCurrentURL} from '../helpers/utils.js';

class Component {
    constructor() {
        this.urlParts = parseCurrentURL();
    }

    async getData() {}
	
    async afterRender() {}
}

export default Component;